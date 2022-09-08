// SPDX-License-Identifier: LGPL-3.0-or-later
pragma solidity 0.5.6;
pragma experimental ABIEncoderV2;

// define the interface and event of Did in this interface
interface IDid {
    event Deactivate(string did);

    function deactivateID(string calldata did) external;

    event AddKey(string did, bytes pubKey, string[] controller);

    function addKey(
        string calldata did,
        bytes calldata newPubKey,
        string[] calldata pubKeyController
    ) external;

    event DeactivateKey(string did, bytes pubKey);

    function deactivateKey(string calldata did, bytes calldata pubKey) external;

    event AddNewAuthKey(string did, bytes pubKey, string[] controller);

    function addNewAuthKey(
        string calldata did,
        bytes calldata pubKey,
        string[] calldata controller
    ) external;

    event SetAuthKey(string did, bytes pubKey);

    function setAuthKey(string calldata did, bytes calldata pubKey) external;

    event DeactivateAuthKey(string did, bytes pubKey);

    function deactivateAuthKey(string calldata did, bytes calldata pubKey)
        external;

    event AddContext(string did, string context);

    function addContext(string calldata did, string[] calldata context)
        external;

    event RemoveContext(string did, string context);

    function removeContext(string calldata did, string[] calldata context)
        external;

    event AddService(string did, string serviceId, string AddService);

    function addService(
        string calldata did,
        string calldata serviceId,
        string calldata publicKey
    ) external;

    event UpdateService(string did, string serviceId, string publicKey);

    function updateService(
        string calldata did,
        string calldata serviceId,
        string calldata publicKey
    ) external;

    event RemoveService(string did, string serviceId);

    function removeService(string calldata did, string calldata serviceId)
        external;
}
