module.exports = async (req, res) => {
  try {
    const url = new URL(req.url, 'https://api.binance.com');
    url.pathname = url.pathname.replace(/^\//, '');
    
    const { method, headers, body } = req;
    
    const response = await fetch(url.toString(), { method, headers, body });
    const data = await response.text();
    
    res.statusCode = response.status;
    res.setHeader('Content-Type', 'application/json');
    res.end(data);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: e.message }));
  }
};
