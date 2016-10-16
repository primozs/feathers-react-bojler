import config from './config';

const init = (req, res, next) => {
  req.config = config;
  next();
};

export default init;
