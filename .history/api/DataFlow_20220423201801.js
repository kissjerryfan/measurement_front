export default $axios => ({
    getMcCabe(file){
        console.log(file)
        return $axios.post('/server/data_flow_diag/mc',{
            msg:'hi',
            file
        })
    },//通知指定的学生打卡
})