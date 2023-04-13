export default $axios => ({
    getMcCabe(file){ 
        console.log('lzk', file.get('file'))
        return $axios.post('/server/data_flow_diag/mc',file)
    },
})