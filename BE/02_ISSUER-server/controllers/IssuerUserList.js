const IssuerUserList = require("../models/IssuerUserList");
const VerifiableCredential = require("../models/VerifiableCredential");
const Wallet = require("../models/Wallet");
const Holder = require("../models/Holder");
const Issuer = require("../models/Issuer");
const { addHash } = require("../utils/UseCaver");
const createError = require("../utils/Error");

/*
    @ dev : create a Issuer User List
    @ desc : 새로운 Issuer User List를 생성합니다.
        - Issuer User List가 생성될 때 DID-Document에 Holder 추가
    @ subject : Issuer
*/
const createIssuerUser = async (req, res, next) => {
  if (req.params.issuerId === req.user.id) {
    try {
      try {
        const issuer = await Issuer.findById(req.user.id);
        const holder = await Holder.findById(req.body.holderId);
        const IssuerDID = "did:klay:" + issuer.walletAddress.slice(2);
        const HolderDID = "did:klay:" + holder.walletAddress.slice(2);
        const VC_Info = await VerifiableCredential.findOne({
          ownerId: req.params.issuerId,
        });
        const issuerWallet = await Wallet.findOne({
          ownerOf: req.params.issuerId,
        });
        const VC_tileNameType =
          "/" +
          VC_Info.credentialTitle +
          "/" +
          req.body.cr_certificateType +
          "/" +
          req.body.cr_certificateName;

        // Issuer DID Document Update
        let start = new Date();
        await addHash(
          IssuerDID,
          HolderDID + VC_tileNameType,
          "",
          issuerWallet.privateKey
        );
        const tx1 = new Date();
        console.log("Blockchain 1(addHash(IssuerDID)) : ", tx1 - start, "ms");
      } catch (err) {
        console.log(err);
      }

      const newIssuerUser = new IssuerUserList({
        ...req.body,
        organizationId: req.user.id,
      });

      await newIssuerUser.save();
      res.status(200).json({
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
      // const issuerUserInfo = await IssuerUserList.findById(issuerUser._id);
      res.status(200).json(issuerUser);
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

module.exports = {
  createIssuerUser,
  deleteIssuerUser,
  updateIssuerUser,
  getIssuerUser,
  getAllIssuerUsers,
};
