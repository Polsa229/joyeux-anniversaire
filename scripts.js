// Fonction pour appliquer le style à chaque lettre
function applyDotStyle ( lettre )
{
    var active_background = "rgb(198, 14, 84)";
    var dot_lettre = lettre.querySelectorAll( '.dot' );
    dot_lettre.forEach( ( dot ) =>
    {
        dot.classList.add( 'animate-background' );
    } );
}

function removeDotStyle ( lettre )
{
    var active_background = "rgb(198, 14, 84)";
    var dot_lettre = lettre.querySelectorAll( '.dot' );
    dot_lettre.forEach( ( dot ) =>
    {
        if ( dot.classList.contains( "animate-background" ) )
        {
            dot.classList.remove( 'animate-background' );
        }
    } );
}


document.addEventListener( "DOMContentLoaded", () =>
{


    var drawn_with_dot = document.querySelector( "#drawn-with-dot" );
    
    if(drawn_with_dot){
        var mots = document.querySelectorAll( ".mot" );
        mots.forEach( async ( mot, index1 ) =>
        {
            var lettres = document.querySelectorAll( ".lettre" );
            lettres.forEach( ( lettre, index ) =>
            {
                // Calcul du délai pour chaque lettre dans chaque mot
                var delay = 100 * index;
                setTimeout( () =>
                {
                    applyDotStyle( lettre );
                }, delay );
    
            } );
    
            // console.log( "Remove dot style." );
            setTimeout( () =>
            {
                lettres.forEach( ( lettre, index ) =>
                {
                    removeDotStyle( lettre );
                    // applyDotStyle( lettre );
                } );
            }, 102 * lettres.length );
    
    
            setTimeout( () =>
            {
                // console.log( "Add dot style." );
                lettres.forEach( ( lettre, index ) =>
                {
                    applyDotStyle( lettre );
                } );

                // drawn_with_dot.classList.add('hidden');
            }, 110 * lettres.length );
    
        } );
    }

} );