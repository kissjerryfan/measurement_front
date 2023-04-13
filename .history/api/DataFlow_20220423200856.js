export default $axios => ({
    getMcCabe(file){
        return $axios.post('/server/data_flow_diag',{
            file
        })
    },//通知指定的学生打卡
})