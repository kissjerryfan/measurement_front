export const actions = {
    getLoc({},file){
        return this.$api.AST.getLoc(file).then((res)=>{
            if(res.data.code==200){
                return Promise.resolve(res.data.data)
            }
            else
            {
                this.$router.push("/mainPage/error")
                return Promise.reject(new Error(res.data.msg))
            }
        },(error)=>{
            this.$router.push("/mainPage/error")
            return Promise.reject(error)
        }).catch((error)=>{
            this.$router.push("/mainPage/error")
            return Promise.reject(error)
        })
    },
    getAST({},file){
        return this.$api.AST.getAST(file).then((res)=>{
            if(res.data.code==200){
                return Promise.resolve(res.data.data)
            }
            else
            {
                this.$router.push("/mainPage/error")
                return Promise.reject(new Error(res.data.msg))
            }
        },(error)=>{
            this.$router.push("/mainPage/error")
            return Promise.reject(error)
        }).catch((error)=>{
            this.$router.push("/mainPage/error")
            return Promise.reject(error)
        })
    },
}