export default $axios => ({
    getClassDiag(file){ 
        return $axios.post('/server/class_diag/artoria',file)
    },
})