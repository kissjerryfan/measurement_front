export default $axios => ({
    getStudent( studentId) {
        return $axios.get('/server/student', {
            params: {
                by:'studentId',
                studentId
            }
        })
    },//根据学号获得指定学生的信息
    checkById(studentId){
        return $axios.post('/server/student/check',{
            by:'studentId',
            studentId
        })
    },//通知指定的学生打卡
})