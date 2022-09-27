const createError = require("../utils/Error");
const Holder = require("../models/Holder");
const KeyPairs = require("../models/KeyPairs");
const Wallet = require("../models/Wallet");

/*
    @ dev : update Holder
    @ desc : Holder 정보를 업데이트 합니다.
    @ subject : Holder
*/

const updateHolder = async (req, res, next) => {
  if (req.params.holderId === req.user.id) {
    try {
      // const { IssuerList, ...others } = req.body;

      const updatedHolder = await Holder.findByIdAndUpdate(
        req.params.holderId,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json({
        data: updatedHolder,
        message: "성공적으로 Holder 업데이트 되었습니다.",
      });
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "인가되지 않은 접근입니다."));
  }
};

/*
      @ dev : delete Holder
      @ desc : Holder을 삭제합니다.
      @ subject : Holder
  */
const deleteHolder = async (req, res, next) => {
  if (req.params.holderId === req.user.id) {
    try {
      await Holder.findByIdAndDelete(req.params.holderId);
      await Wallet.findOneAndDelete({ownerOf : req.params.holderId})
      await KeyPairs.findOneAndDelete({ownerOf : req.params.holderId})
      res.status(200).json("성공적으로 holder가 삭제되었습니다.");
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "인가되지 않은 접근입니다."));
  }
};

/*
      @ dev : get a Holder
      @ desc : 특정 Holder를 출력합니다.
      @ subject : Holder
  */
const getHolder = async (req, res, next) => {
  try {
    const holer = await Holder.findById(req.params.holderId);
    if (!holer) return next(createError(404, "사용자가 존재하지 않습니다."));

    res.status(200).json(holer);
  } catch (error) {
    next(error);
  }
};

/*
      @ dev : get All Holders
      @ desc : 모든 Holderr를 출력합니다.
      @ subject : Holder
  */
const getAllHolders = async (req, res, next) => {
  try {
    const holders = await Holder.find();
    if (!holders) return next(createError(404, "사용자가 존재하지 않습니다."));

    res.status(200).json(holders);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateHolder,
  deleteHolder,
  getHolder,
  getAllHolders,
};
