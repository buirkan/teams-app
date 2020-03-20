/**
 * Recebe-se uma condição, e através da mesma, renderiza-se ou não o conteúdo que está
 * como children do componente.
 *
 */
const Condition = (props) => props.condition ? props.children : false

export default Condition