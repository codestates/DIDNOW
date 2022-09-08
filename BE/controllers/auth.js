const Issuer = require("../models/Issuer");
const Holder = require("../models/Holder");
const Verifier = require("../models/Verifier");
const KeyPair = require("../models/KeyPairs");
const { genKey } = require("../utils/keyPairGenerator");

const bcrypt = require("bcrypt");
const createError = require("../utils/Error");
const jwt = require("jsonwebtoken");


/************/
/* Register */
/************/

/*
    @ dev : Register a Issuer
    @ desc : 새로운 Issuer를 등록합니다.
        - Issuer의 pubKey와 privateKey를 생성합니다. 
    @ subject : Issuer
*/
const registerIssuer = async (req, res, next) => {
  try {
    // 비밀번호 암호화
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    const newIssuer = new Issuer({ ...req.body, password: hashedPassword });

    // Issuer의 pubKey, privateKey 생성
    const { publicKey, privateKey } = genKey();

    // Issuer의 key pair 저장
    const newKeyPairs = new KeyPair({
      ownerOf: newIssuer._id,
      pubKey: publicKey,
      privateKey: privateKey,
    });

    // 새로운 Issuer 저장
    await newIssuer.save();
    // KeyPair 저장
    await newKeyPairs.save();

    res.status(200).json("Issuer가 등록되었습니다.");
  } catch (error) {
    next(error);
  }
};

/*
    @ dev : Register a Holder
    @ desc : 새로운 Holder를 등록합니다.
    @ subject : Holder
    @ required : Caver-js
*/
const registerHolder = async (req, res, next) => {
  try {
    // 비밀번호 암호화
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    const newHolder = new Holder({ ...req.body, password: hashedPassword });

    // Holder의 pubKey, privateKey 생성
    const { publicKey, privateKey } = genKey();

    // Holder의 key pair 저장
    const newKeyPairs = new KeyPair({
      ownerOf: newHolder._id,
      pubKey: publicKey,
      privateKey: privateKey,
    });

    // 새로운 Holder 저장
    await newHolder.save();
    // KeyPair 저장
    await newKeyPairs.save();

    res.status(200).json("Holder가 등록되었습니다.");
  } catch (error) {
    next(error);
  }
};

/*
    @ dev : Register a Verifier
    @ desc : 새로운 Verifier를 등록합니다.
    @ subject : Verifier
*/
const registerVerifier = async (req, res, next) => {
  try {
    // 비밀번호 암호화
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    const newVerifier = new Verifier({ ...req.body, password: hashedPassword });

    // 새로운 Verifier 저장
    await newVerifier.save();

    res.status(200).json("Verifier가 등록되었습니다.");
  } catch (error) {
    next(error);
  }
};

/************/
/*  Login   */
/************/

/*
    @ dev : Login a Issuer
    @ desc : Issuer의 로그인 로직
        -로그인 시 JWT 발급 / Cookie에 태움
    @ subject : Issuer
*/
const loginIssuer = async (req, res, next) => {
  try {
    // DB에서 Issuer를 찾는다.
    const issuer = await Issuer.findOne({ email: req.body.email });
    if (!issuer) return next(createError(404, "Issuer Not Found"));

    // 비밀번호 검증 로직
    const isCorrect = await bcrypt.compare(req.body.password, issuer.password);
    if (!isCorrect) return next(createError(400, "Wrong Password"));

    // 로그인 정보가 올바른 경우
    // JWT 발급
    const token = jwt.sign(
      { id: issuer._id, type: "issuer" },
      process.env.JWT_SECRET,
      { issuer: "DIDNOW", expiresIn: "30m" }
    );
    const { password, ...others } = issuer._doc;

    res
      .cookie("AccessToken", token, {
        httpOnly: true,
        secure: false,
      })
      .status(200)
      .json(others);
  } catch (error) {
    next(error);
  }
};

/*
    @ dev : Login a Holder
    @ desc : Holder의 로그인 로직
    @ subject : Holder
*/

const loginHolder = async (req, res, next) => {
  try {
    // DB에서 Issuer를 찾는다.
    const holder = await Holder.findOne({ email: req.body.email });
    if (!holder) return next(createError(404, "Holder Not Found"));

    // 비밀번호 검증 로직
    const isCorrect = await bcrypt.compare(req.body.password, holder.password);
    if (!isCorrect) return next(createError(400, "Wrong Password"));

    // 로그인 정보가 올바른 경우
    // JWT 발급
    const token = jwt.sign(
      { id: holder._id, type: "holder" },
      process.env.JWT_SECRET,
      { issuer: "DIDNOW", expiresIn: "30m" }
    );
    const { password, ...others } = holder._doc;

    res
      .cookie("AccessToken", token, {
        httpOnly: true,
        secure: false,
      })
      .status(200)
      .json(others);
  } catch (error) {
    next(error);
  }
};

/*
    @ dev : Login a Verifier
    @ desc : Verifier의 Login 로직
    @ subject : Verifier
*/

const loginVerifier = async (req, res, next) => {
  try {
    // DB에서 Issuer를 찾는다.
    const verifier = await Verifier.findOne({ email: req.body.email });
    if (!verifier) return next(createError(404, "Verifier Not Found"));

    // 비밀번호 검증 로직
    const isCorrect = await bcrypt.compare(
      req.body.password,
      verifier.password
    );
    if (!isCorrect) return next(createError(400, "Wrong Password"));

    // 로그인 정보가 올바른 경우
    // JWT 발급
    const token = jwt.sign(
      { id: verifier._id, type: "verifier" },
      process.env.JWT_SECRET,
      { issuer: "DIDNOW", expiresIn: "30m" }
    );
    const { password, ...others } = verifier._doc;

    res
      .cookie("AccessToken", token, {
        httpOnly: true,
        secure: false,
      })
      .status(200)
      .json(others);
  } catch (error) {
    next(error);
  }
};

/************/
/*  Logout  */
/************/

const logout = (req, res, next) => {
  try {
    res
      .cookie("AccessToken", "none")
      .status(200)
      .json("성공적으로 Logout 되었습니다.");
  } catch (error) {
    next(error);
  }
};

/*
    @ dev : Get keyPair
    @ desc : 
         - Issuer의 keyPair를 가져옵니다.
         - Holder의 keyPair를 가져옵니다.
         - 본인의 keyPair만 조회 가능합니다.
    @ subject : Issuer, Holder
*/
const getKeyPair = async (req, res, next) => {
  if (req.params.userId === req.user.id) {
    try {
      const keypairs = await KeyPair.findOne({ ownerOf: req.user.id });
      res.status(200).json(keypairs);
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "인가되지 않은 접근입니다."));
  }
};

/*
    @ dev : Get AccessToken
    @ desc : 
         - 현재 로그인한 사용자의 AccessToken을 반환합니다.
         - Front에서 로그인을 유지하기 위해 사용됩니다.
    @ subject : Issuer, Holder, Verifier
*/
const getAccessToken = async (req, res, next) => {
  try {
    switch (req.user.type) {
      case "issuer":
        const issuer = await Issuer.findById(req.user.id);

        return res.status(200).json(issuer);
      case "holder":
        const holder = await Holder.findById(req.user.id);

        return res.status(200).json(holder);
      case "verifier":
        const verifier = await Verifier.findById(req.user.id);
        return res.status(200).json(verifier);

      default:
        return next(createError(403, "User Not Found"));
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerIssuer,
  registerHolder,
  registerVerifier,
  loginIssuer,
  loginHolder,
  loginVerifier,
  logout,
  getKeyPair,
  getAccessToken
};
