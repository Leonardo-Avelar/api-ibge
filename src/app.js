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

        let url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`;

        $('.cidade').html('<option value="" disabled selected class="first-option">Garregando...</option>');

        $.getJSON(url, (cidades) => {

            montarSelectAPI(estado, cidades);
        });

    };

    let montarSelectAPI = (estado, cidades) => {

        $.each(cidades, (i, field) => {
            $('.cidade').append(`<option value='${field.id}'>${field.nome}</option>`);
        });

        $('.first-option').text('Selecione');
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