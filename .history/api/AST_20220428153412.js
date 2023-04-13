export default $axios => ({
    getLoc(file){ 
        console.log('lzk', file.get('file'))
        return $axios.post('/server/loc/ll',file)
    },
})