export default $axios => ({
    getUUCandUAW(file){ 
        console.log('lzk', file.get('file'))
        return $axios.post('/server/use_case_diag/ava',file)
    },
})