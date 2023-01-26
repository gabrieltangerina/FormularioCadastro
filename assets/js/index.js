class ValidaFormulario{
    constructor(){
        this.formulario = document.querySelector('.formulario');
        this.eventos();
    }

    eventos(){
        this.formulario.addEventListener('submit', e =>{
            this.handleSubmit(e);
        })
    }

    handleSubmit(e){
        e.preventDefault();

        const camposValidos = this.camposSaoValidos();
    }

    camposSaoValidos(){
        let valid = true;

        for(let removerErros of this.formulario.querySelectorAll('.error-text')){
            removerErros.remove();
        }

        for(let campo of this.formulario.querySelectorAll('.validar')){
            const p = campo.previousElementSibling.innerText;

            if(!campo.value){
                this.criaErro(campo, `O campo "${p}" precisa estar preenchido`);
                valid = false;
            }

            if(campo.classList.contains('cpf')){
                if(!this.validaCPF(campo)) valid = false;
            }
        }

        return valid;
    }

    validaCPF(campo){
        const cpf = ValidaCPF(campo.value);

        if(!cpf.valida()){
            this.criaErro(campo, 'CPF inválido');
            return false;
        }

        return true;
    }

    criaErro(campo, msg){
        const div = document.createElement('div');
        div.innerText = msg;
        div.classList.add('error-text')
        campo.insertAdjacentElement('afterend', div);
    }
}

const valida = new ValidaFormulario();