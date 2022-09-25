const VerifiableCredential = require("../models/VerifiableCredential");
const Issuer = require("../models/Issuer");
const createError = require("../utils/Error");

/*
    @ dev : Create Verifiable Credentil Of Issuer
    @ desc : Issuer는 발급할 VC를 생성할 수 있습니다.
    @ subject : Issuer
*/

const createVerifiableCredential = async (req, res, next) => {
  if (req.user.type === "issuer") {
    try {
      const issuer = await Issuer.findById(req.user.id);

      const newVerifiableCredential = new VerifiableCredential({
        ...req.body,
        ownerId: req.user.id,
        IssuedBy: issuer.title,
      });

      const savedVerifiableCredential = await newVerifiableCredential.save();

      res.status(200).json({data : savedVerifiableCredential, message : "Verifiable Credential이 생성되었습니다."});
    } catch (error) {
      next(error);
    }
  } else {
    next(createError(403, "인가되지 않은 접근입니다."));
  }
};

/*
    @ dev : Update Verifiable Credentil Of Issuer
    @ desc : Issuer는 발급할 VC를 업데이트 할 수 있습니다.
    @ subject : Issuer
*/

const updateVerifiableCredential = async (req, res, next) => {
  if (req.user.type === "issuer") {
    try {
      const vc = await VerifiableCredential.findById(req.params.vcId);

      if (vc.ownerId !== req.user.id) {
        next(createError(403, "인가되지 않은 접근입니다."));
      }

      const { IssuedBy, ...others } = req.body;
      await VerifiableCredential.findByIdAndUpdate(
        req.params.vcId,
        { $set: others },
        { new: true }
      );

      res.status(200).json("VC가 성공적으로 업데이트 되었습니다.");
    } catch (error) {
      next(error);
    }
  } else {
    next(createError(403, "인가되지 않은 접근입니다."));
  }
};

/*
    @ dev : Delete Verifiable Credentil Of Issuer
    @ desc : Issuer는 발급할 VC를 삭제 할 수 있습니다.
    @ subject : Issuer
*/
const deleteVerifiableCredential = async (req, res, next) => {
  if (req.user.type === "issuer") {
    try {
      const vc = await VerifiableCredential.findById(req.params.vcId);

      if (vc.ownerId !== req.user.id) {
        next(createError(403, "인가되지 않은 접근입니다."));
      }
      await VerifiableCredential.findByIdAndDelete(req.params.vcId);

      res.status(200).json("VC가 성공적으로 삭제 되었습니다.");
    } catch (error) {
      next(error);
    }
  } else {
    next(createError(403, "인가되지 않은 접근입니다."));
  }
};

/*
      @ dev : Get Verifiable Credentil Of Issuer
      @ desc : Issuer는 발급할 VC를 출력 할 수 있습니다.
      @ subject : Issuer
  */
const getVerifiableCredential = async (req, res, next) => {
  if (req.user.type === "issuer") {
    try {
      const vc = await VerifiableCredential.find({ownerId : req.user.id});

      if (vc.ownerId !== req.user.id) {
        next(createError(403, "인가되지 않은 접근입니다."));
      }

      res.status(200).json(vc);
    } catch (error) {
      next(error);
    }
  } else {
    next(createError(403, "인가되지 않은 접근입니다."));
  }
};

module.exports = {
  createVerifiableCredential,
  updateVerifiableCredential,
  deleteVerifiableCredential,
  getVerifiableCredential,
};
