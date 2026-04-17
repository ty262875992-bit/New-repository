module.exports = (req, res) => {
  const url = new URL(req.url, 'https://api.binance.com');
  url.pathname = url.pathname.replace(/^\//, '');
  
  const { method, headers, body } = req;
  
  fetch(url.toString(), { method, headers, body })
    .then(r => r.text())
    .then(data => {
      res.statusCode = r.status;
      res.setHeader('Content-Type', 'application/json');
      res.end(data);
    })
    .catch(e => {
      res.statusCode = 500;
      res.end(JSON.stringify({ error: e.message }));
    });
};
