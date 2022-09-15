// SPDX-License-Identifier: LGPL-3.0-or-later
pragma solidity 0.5.6;
pragma experimental ABIEncoderV2;

// define the interface and event of Did in this interface
interface IDid {
    event Deactivate(string did);

    function deactivateID(string calldata did) external;

    event AddNewAuthKey(string did, bytes pubKey, string[] controller);

    function addNewAuthKey(
        string calldata did,
        bytes calldata pubKey,
        string[] calldata controller
    ) external;

    event AddContext(string did, string context);

    function addContext(string calldata did, string[] calldata context)
        external;

    event RemoveContext(string did, string context);

    function removeContext(string calldata did, string[] calldata context)
        external;

    event AddService(string did, string serviceId, string value);

    function addProof(string calldata did, string calldata proofPubKey)
        external;

    function issueVC(
        string calldata did,
        string calldata vcId,
        string calldata _type
    ) external;

    function addVC(
        string calldata did,
        string calldata vcId,
        string calldata _hash
    ) external;

    event UpdateService(string did, string serviceId, string value);

    function updateService(
        string calldata did,
        string calldata serviceId,
        string calldata value
    ) external;

    event RemoveService(string did, string value);

    function removeService(string calldata did, string calldata value) external;
}
