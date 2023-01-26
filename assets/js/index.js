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
        const senhasValidas = this.senhasSaoValidas();
    }

    senhasSaoValidas(){
        let valid = true;

        const senha = this.formulario.querySelector('.senha');
        const repetirSenha = this.formulario.querySelector('.repetir-senha');

        if(senha.value !== repetirSenha.value){
            this.criaErro(senha, 'O campo senha e repetir senha devem ser iguais');
            this.criaErro(repetirSenha, 'O campo senha e repetir senha devem ser iguais');

            valid = false;
        }

        if(senha.value.length < 6 || senha.value.length > 12){
            this.criaErro(senha, 'Senha precisa ter entre 6 e 12 caracteres');
            valid = false;
        }
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

            if(campo.classList.contains('usuario')){
                if(!this.validaUsuario(campo)) valid = false;
            }
        }

        return valid;
    }

    validaUsuario(campo){
        const usuario = campo.value;
        let valid = true;

        if(usuario.length < 3 || usuario.length > 12){
            this.criaErro(campo, 'Usuário deverá ter entre 3 e 12 caracteres');
            valid = false;
        }

        if(!usuario.match(/^[a-zA-Z0-9]+$/g)){
            this.criaErro(campo, 'Usuário só poderá conter letrar e/ou números');
            valid = false;
        }

        return valid;
    }

    validaCPF(campo){
        const cpf = new ValidaCPF(campo.value);

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