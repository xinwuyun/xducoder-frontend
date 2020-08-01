export default (req, res) => {
    res.statusCode = 200;
    console.log("Here's api courses");
    // console.log(res);
    res.json(
        Array(30).fill().map((_, i) => (
            {
                id: i,
                title: "C语言指针链表实训课程",
                description: "C语言指针链表实训课程",
                cover: "/Course-Cover.jpg"
            }
        )))
        
  }
  