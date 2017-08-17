function findCep(cepObj, streetId, neighborhoodId, stateId, cityId, nextFieldId){
    jQuery(cepObj).on('blur', function() {
        jQuery(cepObj).val(jQuery(cepObj).val().replace(/\D/g, ''));
        var postcode = jQuery(cepObj).val();
        var url = 'https://api.findcep.com/v1/cep/' + postcode + '.json';
        // Se quiser usar com URL local para realizar chamada externa, descomente a linha abaixo
        // var url = '//' + window.location.hostname + '/findcep/index/findCep/postcode/' + postcode;
        jQuery.ajax({
            url: url,
        }).done(function(data){
            if(typeof data.logradouro != 'undefined'){
                jQuery("[id='" + streetId +"']").val(data.logradouro);
            }
            if(typeof data.cidade != 'undefined'){
                jQuery("[id='" + cityId +"']").val(data.cidade);
            }
            if(typeof data.uf != 'undefined' && typeof billingRegionUpdater != 'undefined'){
                var uf = data.uf.toUpperCase();
                for (i in billingRegionUpdater.regions.BR){
                    if(typeof billingRegionUpdater.regions.BR[i] != 'undefined' &&
                        billingRegionUpdater.regions.BR[i].code == uf){
                        jQuery("[id='" + stateId +"']").val(i);
                    }
                }
            }

            if(typeof data.bairro != 'undefined'){
                jQuery("[id='" + neighborhoodId +"']").val(data.bairro);
            }
            if(typeof data.status_code == undefined || data.status_code != 404){
                jQuery("[id='" + nextFieldId + "']").focus();
            }
        });
    });
}
/*

function findAddress(cepObj, streetId, stateId, cityId, nextFieldId){
    jQuery(cepObj).on('blur', function() {
        jQuery(cepObj).val(jQuery(cepObj).val().replace(/\D/g, ''));
        var postcode = jQuery(cepObj).val();
        var url = 'https://api.findcep.com/v1/cep/' + postcode + '.json';
        var url = '//' + window.location.hostname + '/findcep/index/findCep/postcode/' + postcode;
        jQuery.ajax({
            url: url,
        }).done(function(data){
            if(typeof data.logradouro != 'undefined'){
                jQuery("[id='" + streetId +"']").val(data.logradouro);
            }
            if(typeof data.cidade != 'undefined'){
                jQuery("[id='" + cityId +"']").val(data.cidade);
            }
            if(typeof data.uf != 'undefined' && typeof billingRegionUpdater != 'undefined'){
                var uf = data.uf.toUpperCase();
                for (i in billingRegionUpdater.regions.BR){
                    if(typeof billingRegionUpdater.regions.BR[i] != 'undefined' &&
                        billingRegionUpdater.regions.BR[i].code == uf){
                        jQuery("[id='" + stateId +"']").val(i);
                    }
                }
            }

            if(typeof data.bairro != 'undefined'){
                jQuery("[id='" + neighborhoodId +"']").val(data.bairro);
            }
            if(typeof data.status_code == undefined || data.status_code != 404){
                jQuery("[id='" + nextFieldId + "']").focus();
            }
        });
    });
}

*/
