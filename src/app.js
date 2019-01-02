(() => {

    let buscaEstados = () => {

        let url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/`;

        $.getJSON(url, (estados) => {
            montarEstados(estados);
        });
    };

    let montarEstados = (estados) => {

        let arr = estados.map((estados) => {
            return {
                id: estados.id,
                nome: estados.nome,
            }
        });

        arr.sort((o1, o2) => {
            return o1.nome > o2.nome ? 1 : o1.nome < o2.nome ? -1 : 0;
        });
        
        $.each(arr, (i, field) => {
            $('.estado').append(`<option value='${field.id}'>${field.nome}</option>`);
        });
    };

    let buscaCidades = (estado) => {

        // let url = 'cidades.json';
        console.log(estado);
        let url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`;

        $('.cidade').html('<option value="" disabled selected class="first-option">Garregando...</option>');

        $.getJSON(url, (cidades) => {
            
            console.log(cidades);
            montarSelectAPI(estado, cidades);
        });

    };

    let montarSelectAPI = (estado, cidades) => {

        $.each(cidades, (i, field) => {
            // console.log(field);
            $('.cidade').append(`<option value='${field.id}'>${field.nome}</option>`);
        });

        $('.first-option').text('Selecione');
    };

    let montarSelect = (estado, cidades) => {

        console.log(cidades);

        let as = $(cidades).filter((i, n) => {
            return n.Estado===estado;
        });
        
        for (var i=0; i<as.length; i++) {
            $('.cidade').append(`<option value='${as[i].ID}'>${as[i].Nome}</option>`);
        }
        
        // $.each(as, (i, field) => {
        //     console.log(field);
        //     $('.cidade').append(`<option value='${i}'>${field.Nome}</option>`);
        // });

        $('.first-option').text('Selecione');

        // $('.cidade').formSelect();
    };

    let initializeSelect = () => {
        // $('.estado').formSelect();

        $('.estado').change(() => {
            let estado = $('option:selected', this).val();
            buscaCidades(estado);
        });
    };

    $(document).ready(() => {
        buscaEstados();
        initializeSelect();
    });
})();