// SPDX-License-Identifier: LGPL-3.0-or-later
pragma solidity 0.5.6;

library IterableMapping {
    struct IndexValue {
        uint256 keyIndex;
        bytes value;
    }

    struct KeyFlag {
        bytes32 key;
        bool deleted;
    }

    struct itmap {
        mapping(bytes32 => IndexValue) data;
        KeyFlag[] keys;
        uint256 size;
    }

    function getSize(itmap storage self) internal view returns (uint256) {
        return self.size;
    }

    function getValue(itmap storage self, bytes32 key)
        internal
        view
        returns (bytes memory)
    {
        return self.data[key].value;
    }

    function insert(
        itmap storage self,
        bytes32 key,
        bytes memory value
    ) internal returns (bool replaced) {
        uint256 keyIndex = self.data[key].keyIndex;
        self.data[key].value = value;
        if (keyIndex > 0) return true;
        else {
            keyIndex = self.keys.length;
            self.keys.push(KeyFlag(key, false));
            self.data[key].keyIndex = keyIndex + 1;
            self.keys[keyIndex].key = key;
            self.size++;
            return false;
        }
    }

    function remove(itmap storage self, bytes32 key)
        internal
        returns (bool success)
    {
        uint256 keyIndex = self.data[key].keyIndex;
        if (keyIndex == 0) return false;
        delete self.data[key];
        self.keys[keyIndex - 1].deleted = true;
        self.size--;
        return true;
    }

    function contains(itmap storage self, bytes32 key)
        internal
        view
        returns (bool)
    {
        return self.data[key].keyIndex > 0;
    }

    function iterate_start(itmap storage self)
        internal
        view
        returns (uint256 keyIndex)
    {
        return iterate_next(self, uint256(-1));
    }

    function iterate_valid(itmap storage self, uint256 keyIndex)
        internal
        view
        returns (bool)
    {
        return keyIndex < self.keys.length;
    }

    function iterate_next(itmap storage self, uint256 keyIndex)
        internal
        view
        returns (uint256 r_keyIndex)
    {
        keyIndex++;
        while (keyIndex < self.keys.length && self.keys[keyIndex].deleted)
            keyIndex++;
        return keyIndex;
    }

    function iterate_get(itmap storage self, uint256 keyIndex)
        internal
        view
        returns (bytes32 key, bytes memory value)
    {
        key = self.keys[keyIndex].key;
        value = self.data[key].value;
    }
}
