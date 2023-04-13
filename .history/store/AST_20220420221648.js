export const actions = {
    getStudent({}, studentId) {
        return this.$api.student.getStudent(studentId).then((res) => {
            if(res.data.code == 200) {
                return Promise.resolve(res.data.data)
            }
            else {
                this.$router.push("/mainPage/error")
                return Promise.reject(new Error(res.data.msg))
            }
        }, (error) => {
            this.$router.push("/mainPage/error")
            return Promise.reject(error)
        }).catch((error) => {
            this.$router.push("/mainPage/error")
            return Promise.reject(error)
        })
    },
    updateStudent({},student){
        return this.$api.student.updateStudent(student).then((res)=>{
            if(res.data.code==200){
                return Promise.resolve(res.data.msg)
            }
            else{
                this.$router.push("/mainPage/error")
                return Promise.reject(new Error(res.data.msg))
            }
        },(error) => {
            this.$router.push("/mainPage/error")
            return Promise.reject(error)
        }).catch((error)=>{
            this.$router.push("/mainPage/error")
            return Promise.reject(error)
        })
    },
}