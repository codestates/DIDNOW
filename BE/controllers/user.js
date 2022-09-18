const Issuer = require("../models/Issuer");
const IssuerUserList = require("../models/IssuerUserList");
const Verifier = require("../models/Verifier");
const createError = require("../utils/Error");

/*
    @ dev : update Issuer
    @ desc : Issuer를 업데이트 합니다.
    @ subject : Issuer
*/
const updateIssuer = async (req, res, next) => {
  if (req.params.issuerId === req.user.id) {
    try {
      const updatedIssuer = await Issuer.findByIdAndUpdate(
        req.params.issuerId,
        { $set: req.body },
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

/*
    @ dev : create a Issuer User List
    @ desc : 새로운 Issuer User List를 생성합니다.
    @ subject : Issuer
*/
const createIssuerUser = async (req, res, next) => {
  if (req.params.issuerId === req.user.id) {
    try {
      const newIssuerUser = new IssuerUserList({
        ...req.body,
        organizationId: req.user.id,
      });

      await newIssuerUser.save();
      res
        .status(200)
        .json({
          data: newIssuerUser,
          message: "IssuerUserList가 성공적으로 저장되었습니다.",
        });
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "인가되지 않은 접근입니다."));
  }
};

/*
    @ dev : delete a Issuer User List
    @ desc : Issuer User List를 삭제합니다.
    @ subject : Issuer
*/
const deleteIssuerUser = async (req, res, next) => {
  const issuerUser = await IssuerUserList.findById(req.params.issuerUserId);
  if (!issuerUser)
    return next(createError(400, "등록되지 않은 IssuerUser입니다."));

  if (issuerUser.organizationId === req.user.id) {
    try {
      await IssuerUserList.findByIdAndDelete(issuerUser._id);
      res.status(200).json("IssuerUser가 성공적으로 삭제되었습니다.");
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "인가되지 않은 접근입니다."));
  }
};

/*
    @ dev : get a Issuer User List
    @ desc : 특정 Issuer User를 출력합니다. 
    @ subject : Issuer
*/
const updateIssuerUser = async (req, res, next) => {
  const issuerUser = await IssuerUserList.findById(req.params.issuerUserId);
  if (!issuerUser)
    return next(createError(400, "등록되지 않은 IssuerUser입니다."));

  if (issuerUser.organizationId === req.user.id) {
    try {
      await IssuerUserList.findByIdAndUpdate(
        issuerUser._id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json("IssuerUser가 성공적으로 update 되었습니다.");
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "인가되지 않은 접근입니다."));
  }
};

/*
    @ dev : get a Issuer User List
    @ desc : 특정 Issuer User를 출력합니다. 
    @ subject : Issuer
*/
const getIssuerUser = async (req, res, next) => {
  const issuerUser = await IssuerUserList.findById(req.params.issuerUserId);
  if (!issuerUser)
    return next(createError(400, "등록되지 않은 IssuerUser입니다."));

  if (issuerUser.organizationId === req.user.id) {
    try {
      const issuerUserInfo = await IssuerUserList.findById(issuerUser._id);
      res.status(200).json(issuerUserInfo);
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "인가되지 않은 접근입니다."));
  }
};

/*
    @ dev : get All Issuer User Lists
    @ desc : Issuer의 모든 User를 출력합니다.
    @ subject : Issuer
*/
const getAllIssuerUsers = async (req, res, next) => {
  if (req.params.issuerId) {
    try {
      const issuerUserInfos = await IssuerUserList.find();
      res.status(200).json(issuerUserInfos);
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "인가되지 않은 접근입니다."));
  }
};

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
      if (!verifiers) return next(createError(404, "사용자가 존재하지 않습니다."));
  
      res.status(200).json(verifiers);
    } catch (error) {
      next(error);
    }
  };


module.exports = {
  updateIssuer,
  deleteIssuer,
  getIssuer,
  getAllIssuers,
  createIssuerUser,
  deleteIssuerUser,
  updateIssuerUser,
  getIssuerUser,
  getAllIssuerUsers,
  updateVerifier,
  deleteVerifier,
  getVerifier,
  getAllVerifiers,
};
