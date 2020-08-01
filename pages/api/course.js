export default (req, res) => {
    res.statusCode = 200;
    console.log("Here's api course");
    res.json(
        {
            CourseID: 1,
            CourseName: "C语言程序基础设计",
            CourseNum:300,
            completeNum:1,
            CourseDIF:"简单",
            CourseDescription: "C语言程序基础设计C语言程序基础设计C语言程序基础设计C语言程序基础设计C语言程序基础设计C语言程序基础设计",
            stepID:1,
            chapters: [
                {
                    step:1,
                    stepName:"C语言分支结构",
                    stepDescription:"C语言分支结构C语言分支结构C语言分支结构C语言分支结构C语言分支结构C语言分支结构",
                    stepUrl:""
                },
                {
                    step:2,
                    stepName:"C语言指针链表",
                    stepDescription:"C语言指针链表C语言指针链表C语言指针链表C语言指针链表C语言指针链表C语言指针链表",
                    stepUrl:"/jupter"
                }
            ]
        }
    )
}