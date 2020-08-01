export default (req, res) => {
  if (req.method === "POST") {
    console.log("Here's Server");
    console.log(req.body);
  }
  res.statusCode = 200;
  if (req.body.accessToken === "6666")   res.json({account:req.body.account, msg: "success" , token:"6666"});
  else if (req.body.password === "123456") res.json({account:req.body.account, msg: "success" , token:"6666"});
  else 
      res.json({ msg: "failed" ,token:""});
};
