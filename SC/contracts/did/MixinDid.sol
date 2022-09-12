// SPDX-License-Identifier: LGPL-3.0-or-later
pragma solidity 0.5.6;
pragma experimental ABIEncoderV2;

import "../interface/IDid.sol";
import "./MixinDidStorage.sol";
import "../libs/DidUtils.sol";
import "../libs/KeyUtils.sol";
import "../libs/BytesUtils.sol";
import "../libs/ZeroCopySink.sol";
import "../libs/ZeroCopySource.sol";
import "../libs/StorageUtils.sol";

/**
 * @title DIDContract
 * @dev This contract is did logic implementation
 */
contract DIDContract is MixinDidStorage, IDid {
    constructor() public {}

    /**
     * @dev deactivate did, delete all document data of this did, but record did has been registered,
     *    it means this did cannot been registered in the future
     * @param did did
     */
    function deactivateID(string memory did) public {
        bytes memory singer = BytesUtils.getSinger(did);
        did = checkWhenOperate(did, singer);
        // delete context
        delete data[KeyUtils.genContextKey(did)];
        // delete public key list
        delete data[KeyUtils.genPubKeyListKey(did)];
        // delete controller
        delete data[KeyUtils.genControllerKey(did)];
        // delete service
        delete data[KeyUtils.genServiceKey(did)];
        // delete update time
        delete data[KeyUtils.genUpdateTimeKey(did)];
        // update status
        didStatus[did].deactivated = true;
        didStatus[did].authListLen = 0;
        emit Deactivate(did);
    }

    /**
     * @dev add a new public key to authentication list only, doesn't enter public key list
     * @param did did
     * @param pubKey the new public key
     * @param controller controller of newPubKey, they are some did
     */
    function addNewAuthKey(
        string memory did,
        bytes memory pubKey,
        string[] memory controller
    ) public {
        bytes memory singer = BytesUtils.getSinger(did);
        did = checkWhenAddKey(did, singer, controller);
        addNewPubKey(
            did,
            pubKey,
            address(0),
            "EcdsaSecp256k1VerificationKey2019",
            controller,
            false,
            true
        );
        emit AddNewAuthKey(did, pubKey, controller);
    }

    function addNewPubKey(
        string memory did,
        bytes memory pubKey,
        address addr,
        string memory keyType,
        string[] memory controller,
        bool isPub,
        bool isAuth
    ) internal {
        require(controller.length >= 1, "controller empty");
        IterableMapping.itmap storage pubKeyList = data[
            KeyUtils.genPubKeyListKey(did)
        ];
        uint256 keyIndex = pubKeyList.keys.length + 2;
        string memory pubKeyId = string(
            abi.encodePacked(did, "#keys-", BytesUtils.uint2str(keyIndex))
        );
        bytes memory pubKeyData = encodePubKeyAndAddr(pubKey, addr);
        StorageUtils.PublicKey memory pub = StorageUtils.PublicKey(
            pubKeyId,
            keyType,
            controller,
            pubKeyData,
            false,
            isPub,
            isAuth ? fetchAuthIndex(did) : 0
        );
        StorageUtils.insertNewPubKey(pubKeyList, pub);
        updateTime(did);
    }

    function fetchAuthIndex(string memory did) internal returns (uint256) {
        uint256 authIndex = didStatus[did].authListLen + 2;
        // this means each auth key index increased 2 every time
        didStatus[did].authListLen = authIndex;
        return authIndex;
    }

    function encodePubKeyAndAddr(bytes memory pubKey, address addr)
        internal
        pure
        returns (bytes memory)
    {
        // pubKey may be empty, but pack it has no matter
        bytes memory pubKeyData = abi.encodePacked(pubKey);
        if (addr != address(0)) {
            pubKeyData = abi.encodePacked(pubKeyData, addr);
        }
        return pubKeyData;
    }

    /**
     * @dev add context to did document
     * @param did did
     * @param contexts contexts
     */
    function addContext(string memory did, string[] memory contexts) public {
        bytes memory singer = BytesUtils.getSinger(did);
        did = checkWhenOperate(did, singer);
        string memory ctxKey = KeyUtils.genContextKey(did);
        for (uint256 i = 0; i < contexts.length; i++) {
            string memory ctx = contexts[i];
            bytes32 key = KeyUtils.genContextSecondKey(ctx);
            bool replaced = data[ctxKey].insert(key, bytes(ctx));
            if (!replaced) {
                emit AddContext(did, ctx);
            }
        }
        updateTime(did);
    }

    /**
     * @dev remove context from did document
     * @param did did
     * @param contexts contexts
     */
    function removeContext(string memory did, string[] memory contexts) public {
        bytes memory singer = BytesUtils.getSinger(did);
        did = checkWhenOperate(did, singer);
        string memory ctxKey = KeyUtils.genContextKey(did);
        for (uint256 i = 0; i < contexts.length; i++) {
            string memory ctx = contexts[i];
            bytes32 key = KeyUtils.genContextSecondKey(ctx);
            bool success = data[ctxKey].remove(key);
            if (success) {
                emit RemoveContext(did, ctx);
            }
        }
        updateTime(did);
    }

    /**
     * @dev add service to did service list
     * @param did did
     * @param serviceId service id
     * @param publicKey public Key For Decode(Not Wallet Key)
     */
    function addService(
        string memory did,
        string memory serviceId,
        string memory publicKey
    ) public {
        bytes memory singer = BytesUtils.getSinger(did);
        did = checkWhenOperate(did, singer);
        string memory serviceKey = KeyUtils.genServiceKey(did);
        bytes32 key = KeyUtils.genServiceSecondKey(serviceId);
        StorageUtils.Service memory service = StorageUtils.Service(
            serviceId,
            publicKey
        );
        bytes memory serviceBytes = StorageUtils.serializeService(service);
        bool replaced = data[serviceKey].insert(key, serviceBytes);
        require(!replaced, "service existed");
        updateTime(did);
        emit AddService(did, serviceId, publicKey);
    }

    /**
     * @dev update service
     * @param did did
     * @param serviceId service id
     * @param publicKey publicKey For Decode(Not Wallet Key)
     */
    function updateService(
        string memory did,
        string memory serviceId,
        string memory publicKey
    ) public {
        bytes memory singer = BytesUtils.getSinger(did);
        did = checkWhenOperate(did, singer);
        string memory serviceKey = KeyUtils.genServiceKey(did);
        bytes32 key = KeyUtils.genServiceSecondKey(serviceId);
        StorageUtils.Service memory service = StorageUtils.Service(
            serviceId,
            publicKey
        );
        bytes memory serviceBytes = StorageUtils.serializeService(service);
        bool replaced = data[serviceKey].insert(key, serviceBytes);
        require(replaced, "service not exist");
        updateTime(did);
        emit UpdateService(did, serviceId, publicKey);
    }

    /**
     * @dev remove service
     * @param did did
     * @param serviceId service id
     */
    function removeService(string memory did, string memory serviceId) public {
        bytes memory singer = BytesUtils.getSinger(did);
        did = checkWhenOperate(did, singer);
        string memory serviceKey = KeyUtils.genServiceKey(did);
        bytes32 key = KeyUtils.genServiceSecondKey(serviceId);
        bool success = data[serviceKey].remove(key);
        require(success, "service not exist");
        updateTime(did);
        emit RemoveService(did, serviceId);
    }

    function updateTime(string memory did) internal {
        string memory updateTimeKey = KeyUtils.genUpdateTimeKey(did);
        bytes32 key = KeyUtils.genUpdateTimeSecondKey();
        data[updateTimeKey].insert(key, ZeroCopySink.WriteUint255(now));
    }

    function checkWhenAddKey(
        string memory did,
        bytes memory singer,
        string[] memory keyController
    ) internal view returns (string memory) {
        for (uint256 i = 0; i < keyController.length; i++) {
            require(
                DidUtils.verifyDIDFormat(keyController[i]),
                "illegal controller"
            );
        }
        return checkWhenOperate(did, singer);
    }

    function checkWhenOperate(string memory did, bytes memory singer)
        internal
        view
        returns (string memory)
    {
        (bool verified, string memory lowerDid) = verifyDIDSignature(
            did,
            singer
        );
        require(verified, "check sig failed");
        return lowerDid;
    }

    /**
     * @dev verify tx has signed by did
     * @param did did
     * @param singer tx signer, could be public key or address
     */
    function verifySignature(string memory did, bytes memory singer)
        public
        view
        returns (bool)
    {
        (bool verified, ) = verifyDIDSignature(did, singer);
        return verified;
    }

    function verifyDIDSignature(string memory did, bytes memory singer)
        public
        view
        returns (bool, string memory)
    {
        did = BytesUtils.toLower(did);
        if (!DidUtils.verifyDIDFormat(did)) {
            return (false, "!DidUtils.verifyDIDFormat(did)");
        }
        if (didStatus[did].deactivated) {
            return (false, "didStatus[did].deactivated");
        }
        // if singer.length > 0, verify singer is listed in self public key list and authenticated
        // else verify msg.sender is did
        address didAddr = DidUtils.parseAddrFromDID(bytes(did));
        if (singer.length == 0) {
            return (
                didAddr == msg.sender || didAddr == tx.origin,
                "singer.length == 0"
            );
        } else {
            address signer;
            bytes32 pubKeyListSecondKey;
            if (singer.length == 20) {
                signer = BytesUtils.bytesToAddress(singer);
                pubKeyListSecondKey = KeyUtils.genPubKeyListSecondKey(
                    encodePubKeyAndAddr(new bytes(0), signer)
                );
            } else {
                signer = DidUtils.pubKeyToAddr(singer);
                pubKeyListSecondKey = KeyUtils.genPubKeyListSecondKey(
                    encodePubKeyAndAddr(singer, address(0))
                );
            }
            if (signer != msg.sender && signer != tx.origin) {
                return (false, "signer != msg.sender && signer != tx.origin");
            }
            // self sign
            if (signer == didAddr) {
                return (true, did);
            }
            string memory pubKeyListKey = KeyUtils.genPubKeyListKey(did);
            if (!data[pubKeyListKey].contains(pubKeyListSecondKey)) {
                return (
                    false,
                    "!data[pubKeyListKey].contains(pubKeyListSecondKey"
                );
            }
            StorageUtils.PublicKey memory pub = StorageUtils.deserializePubKey(
                data[pubKeyListKey].data[pubKeyListSecondKey].value
            );
            if (pub.deactivated || pub.authIndex == 0) {
                return (false, "pub.deactivated || pub.authIndex == 0");
            }
            return (true, did);
        }
    }

    /**
     * @dev query authentication list
     * @param did did
     */
    function getAllAuthKey(string memory did)
        public
        view
        returns (StorageUtils.PublicKey[] memory)
    {
        did = BytesUtils.toLower(did);
        require(!didStatus[did].deactivated, "did deactivated");
        IterableMapping.itmap storage pubKeyList = data[
            KeyUtils.genPubKeyListKey(did)
        ];
        return
            StorageUtils.getAllAuthKey(
                did,
                "EcdsaSecp256k1RecoveryMethod2020",
                pubKeyList
            );
    }

    /**
     * @dev query context list
     * @param did did
     */
    function getContext(string memory did)
        public
        view
        returns (string[] memory)
    {
        did = BytesUtils.toLower(did);
        require(!didStatus[did].deactivated, "did deactivated");
        string memory ctxListKey = KeyUtils.genContextKey(did);
        IterableMapping.itmap storage ctxList = data[ctxListKey];
        return StorageUtils.getContext(ctxList, "https://www.w3.org/ns/did/v1");
    }

    /**
     * @dev query service list
     * @param did did
     */
    function getAllService(string memory did)
        public
        view
        returns (StorageUtils.Service[] memory)
    {
        did = BytesUtils.toLower(did);
        string memory serviceKey = KeyUtils.genServiceKey(did);
        IterableMapping.itmap storage serviceList = data[serviceKey];
        return StorageUtils.getAllService(serviceList);
    }

    /**
     * @dev query did updated time
     * @param did did
     */
    function getUpdatedTime(string memory did) public view returns (uint256) {
        did = BytesUtils.toLower(did);
        string memory updateTimeKey = KeyUtils.genUpdateTimeKey(did);
        bytes32 key = KeyUtils.genUpdateTimeSecondKey();
        bytes memory time = data[updateTimeKey].data[key].value;
        if (time.length == 0) {
            return 0;
        }
        (uint256 result, ) = ZeroCopySource.NextUint255(time, 0);
        return result;
    }

    /**
     * @dev query document
     * @param did did
     */
    function getDocument(string memory did)
        public
        view
        returns (StorageUtils.DIDDocument memory)
    {
        did = BytesUtils.toLower(did);
        string[] memory context = getContext(did);
        StorageUtils.PublicKey[] memory authentication = getAllAuthKey(did);
        StorageUtils.Service[] memory service = getAllService(did);
        uint256 updated = getUpdatedTime(did);
        // always set created time as 0
        return
            StorageUtils.DIDDocument(
                context,
                did,
                authentication,
                service,
                updated
            );
    }
}
