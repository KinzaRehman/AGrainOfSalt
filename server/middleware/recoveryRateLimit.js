// Limits each IP to 10 recovery requests per 15 minutes. Counts live in this server process only.
// Bound recovery traffic without storing email addresses or reset tokens.
const requests = new Map();
const windowMs = 15 * 60 * 1000;
const cleanup = setInterval(() => {
  for (const [ip, entry] of requests) {
    if (entry.expires <= Date.now()) requests.delete(ip);
  }
}, windowMs);
cleanup.unref();

module.exports = function recoveryRateLimit(req, res, next) {
  const now = Date.now();
  let entry = requests.get(req.ip);
  if (!entry || entry.expires <= now) {
    entry = { count: 0, expires: now + windowMs };
    requests.set(req.ip, entry);
  }
  if (++entry.count > 10) {
    res.set('Retry-After', String(Math.ceil((entry.expires - now) / 1000)));
    return res.status(429).json({ message: 'Too many recovery attempts. Please try again in 15 minutes.' });
  }
  next();
};
