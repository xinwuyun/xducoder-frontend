export default (req, res) => {
    res.statusCode = 200;
    console.log("Here's api index courses");
    res.json(
        Array(4).fill().map((_, i) => (
            {
                id: i,
                title: "C++ 从入门到再入门",
                description: "无",
                cover: "/Course-Cover.jpg"
            }
        )))
  }
  