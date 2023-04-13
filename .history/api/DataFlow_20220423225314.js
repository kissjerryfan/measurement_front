export default $axios => ({
    getMcCabe(file){
        return $axios.post('/server/data_flow_diag/mc',{file})
    },
})