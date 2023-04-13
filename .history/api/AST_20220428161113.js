export default $axios => ({
    getLoc(file){ 
        console.log('lzk', file.get('file'))
        return $axios.post('/server/loc/loc',file)
    },
    getAst(file){
        return $axios.post('/server/ast/metric', file)
    }
})