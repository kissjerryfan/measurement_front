export default $axios => ({
    getLoc(file){ 
        return $axios.post('/server/loc/loc',file)
    },
    getAST(file){
        return $axios.post('/server/ast/metric', file)
    }
})