const createError = require("../utils/Error");
const Verifier = require("../models/Verifier");
// const VerifyList = require('../models/VerifyList');
// const Holder = require("../models/Holder");
// const { getProof, getAllService, verifyVC } = require("../utils/UseCaver");


/*
    @ dev : update Verifier
    @ desc : Verifier 정보를 업데이트 합니다.
    @ subject : Verifier
*/


const updateVerifier = async (req, res, next) => {
  if (req.params.verifierId === req.user.id) {
    try {
      const updatedVerifier = await Verifier.findByIdAndUpdate(
        req.params.verifierId,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json({
        data: updatedVerifier,
        message: "성공적으로 Verifier 업데이트 되었습니다.",
      });
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "인가되지 않은 접근입니다."));
  }
};

/*
      @ dev : delete Verifier
      @ desc : Verfier을 삭제합니다.
      @ subject : Verifier
  */
const deleteVerifier = async (req, res, next) => {
  if (req.params.verifierId === req.user.id) {
    try {
      await Verifier.findByIdAndDelete(req.params.verifierId);
      res.status(200).json("성공적으로 verifier가 삭제되었습니다.");
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "인가되지 않은 접근입니다."));
  }
};

/*
      @ dev : get a Verifier
      @ desc : 특정 Verifier를 출력합니다.
      @ subject : Holder
  */
const getVerifier = async (req, res, next) => {
  try {
    const verifier = await Verifier.findById(req.params.verifierId);
    if (!verifier) return next(createError(404, "사용자가 존재하지 않습니다."));

    res.status(200).json(verifier);
  } catch (error) {
    next(error);
  }
};

/*
      @ dev : get All Verifiers
      @ desc : 모든 Verifier를 출력합니다.
      @ subject : Holder
  */
const getAllVerifiers = async (req, res, next) => {
  try {
    const verifiers = await Verifier.find();
    if (!verifiers)
      return next(createError(404, "사용자가 존재하지 않습니다."));

    res.status(200).json(verifiers);
  } catch (error) {
    next(error);
  }
};


module.exports = {
  updateVerifier,
  deleteVerifier,
  getVerifier,
  getAllVerifiers,
};
