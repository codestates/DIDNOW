// const IssuerUserList = require("../models/IssuerUserList");
// const VerifiableCredential = require("../models/VerifiableCredential");
// const Wallet = require("../models/Wallet");
// const Holder = require("../models/Holder");
const Issuer = require("../models/Issuer");
// const { addHash } = require("../utils/UseCaver");
const createError = require("../utils/Error");

/*
    @ dev : update Issuer
    @ desc : Issuer를 업데이트 합니다.
    @ subject : Issuer
*/
const updateIssuer = async (req, res, next) => {
  if (req.params.issuerId === req.user.id) {
    try {
      const { requiredVC, ...others } = req.body;
      const updatedIssuer = await Issuer.findByIdAndUpdate(
        req.params.issuerId,
        {
          $addToSet: { requiredVC: requiredVC },
          $set: others,
        },
        { new: true }
      );
      res.status(200).json({
        data: updatedIssuer,
        message: "성공적으로 Issuer 업데이트 되었습니다.",
      });
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "인가되지 않은 접근입니다."));
  }
};

/*
    @ dev : delete Issuer
    @ desc : Issuer를 삭제합니다.
    @ subject : Issuer
*/
const deleteIssuer = async (req, res, next) => {
  if (req.params.issuerId === req.user.id) {
    try {
      await Issuer.findByIdAndDelete(req.params.issuerId);
      res.status(200).json("성공적으로 Issuer가 삭제되었습니다.");
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "인가되지 않은 접근입니다."));
  }
};

/*
    @ dev : get a Issuer
    @ desc : 특정 Issuer를 가져옵니다. 
    @ subject : Holder
*/
const getIssuer = async (req, res, next) => {
  try {
    const issuer = await Issuer.findById(req.params.issuerId);
    if (!issuer) return next(createError(404, "사용자가 존재하지 않습니다."));

    res.status(200).json(issuer);
  } catch (error) {
    next(error);
  }
};

/*
    @ dev : get All Issuers
    @ desc : 모든 Issuer를 가져옵니다.
    @ subject : Holder
*/
const getAllIssuers = async (req, res, next) => {
  try {
    const issuers = await Issuer.find();
    if (!issuers) return next(createError(404, "사용자가 존재하지 않습니다."));

    res.status(200).json(issuers);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateIssuer,
  deleteIssuer,
  getIssuer,
  getAllIssuers,
};
