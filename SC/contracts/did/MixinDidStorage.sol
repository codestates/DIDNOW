// SPDX-License-Identifier: LGPL-3.0-or-later
pragma solidity 0.5.6;

import "../libs/IterableMapping.sol";

/**
 * @title MixinDidStorage
 * @dev This contract is did storage implementation
 */
contract MixinDidStorage {
    using IterableMapping for IterableMapping.itmap;
    mapping(string => IterableMapping.itmap) public data; // data storage

    struct DIDStatus {
        bool deactivated;
        uint256 authListLen;
    }

    mapping(string => DIDStatus) public didStatus;
}
