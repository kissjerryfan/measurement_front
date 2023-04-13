import AST from '~/api/AST'
import UMLClass from '~/api/UMlCLass'
import UMLUserCase from '~/api/UMLUserCase'
import DataFlow from '~/api/DataFlow'

export default (context, inject)=>{
    let repositories = {
        AST: AST(context.$axios),
        UMLClass: UMLClass(context.$axios),
        UMLUserCase: UMLUserCase(context.$axios),
        DataFlow: DataFlow(context.$axios)
    }
    inject('api', repositories)
}