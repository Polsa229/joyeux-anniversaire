function redirection ( page, timer )
{
    setTimeout( () =>
    {
        window.location.href = page;
    }, timer );
}

function getImage ()
{
    return new Promise( ( resolve, reject ) =>
    {
        $.ajax( {
            url: 'get_images.php', // Chemin vers le fichier PHP
            type: 'GET',
            dataType: 'json',
            success: function ( response )
            {
                resolve( response );
            },
            error: function ( xhr, status, error )
            {
                reject( error );
            }
        } );
    } );
}

function selectRandomImage ( lastArray, array, status )
{
    let index1;
    let index2;
    console.log( "status: ", status )

    if ( status )
    {
        try
        {
            // Génère deux indices aléatoires différents dans le tableau
            index1 = Math.floor( Math.random() * array.length );
            return "img/" + array[ index1 ];
        } catch ( err ) { console.log( "Error : ", err ) };
    } else
    {
        try
        {
            // Génère deux indices aléatoires différents dans le tableau
            index1 = Math.floor( Math.random() * array.length );

            // Vérifie si le tableau contient au moins deux éléments
            if ( array.length < 2 )
            {
                index2 = index1;
            } else
            {
                while ( lastArray.includes( array[ index1 ] ) )
                {
                    index1 = Math.floor( Math.random() * array.length );
                }

                do
                {
                    index2 = Math.floor( Math.random() * array.length );
                } while ( index2 === index1 && lastArray.includes( array[ index2 ] ) );
            }

            // Retourne les deux éléments correspondants aux indices aléatoires
            // console.log( "Img 1: ", "img/" + array[ index1 ] )
            // console.log( "Img 2: ", "img/" + array[ index2 ] )

            return [ "img/" + array[ index1 ], "img/" + array[ index2 ] ];
        } catch ( error )
        {
            console.error( "Erreur de génération d'image aléatoirement: ", error );
            return [ "img/" + array[ 1 ], "img/" + array[ 0 ] ];
        }
    }
}

function checkStateSound ()
{
    var checkboxSound = document.getElementById( "checkboxSound" );
    var welcomeSound = document.getElementById( "welcomeSound" );
    welcomeSound.volume = 0.3;
    if ( checkboxSound.checked )
    {
        welcomeSound.play();
    } else
    {
        welcomeSound.pause();
    }
}

document.addEventListener( 'DOMContentLoaded', async () =>
{
    let listImage = [];
    let seletInListImage = [];
    let clique = 0;

    listImage = await getImage();
    // console.log( "listImage: ", listImage );
    
    var checkboxSound = document.getElementById( "checkboxSound" );
    var welcomeSound = document.getElementById( "welcomeSound" );
    welcomeSound.volume = 0.3;
    // Allumez le son d'accueil
    welcomeSound.play();
    
     document.addEventListener('click',()=>{
        if ( checkboxSound.checked )
        {
            welcomeSound.play();
        } 
    })
    
    checkboxSound.addEventListener('click',()=>{
        if ( checkboxSound.checked )
        {
            welcomeSound.play();
        } else
        {
            welcomeSound.pause();
        }
    })
    

    if ( document.getElementById( "start" ) )
    {
        // console.log( "Page d'accueil ! " )
        setInterval( () =>
        {
            document.querySelector( "#start img" ).src = selectRandomImage( seletInListImage, listImage, true )
        }, 3000 );

    }

    if ( document.getElementById( "button-gallery" ) )
    {
        var audioPlayer = document.getElementById( "lockSound" );
        seletInListImage = selectRandomImage( seletInListImage, listImage, false );
        console.log( "seletInListImage: ", seletInListImage )
        console.log( "seletInListImage: ", seletInListImage )
        document.querySelector( ".card-back img" ).src = seletInListImage[ 1 ];
        document.querySelector( ".card-front img" ).src = seletInListImage[ 0 ];

        setInterval( () =>
        {
            seletInListImage = selectRandomImage( seletInListImage, listImage, false );
            document.querySelector( ".card-back img" ).src = seletInListImage[ 1 ];
            document.querySelector( ".card-front img" ).src = seletInListImage[ 0 ];
        }, 10000 );
        
        document.getElementById( "button-gallery" ).addEventListener( "click", function ()
        {
            document.getElementById( "button-gallery" ).disabled=true;
            audioPlayer.play();
            audioPlayer.volume = 1;
            clique++;

            if ( clique === 2 )
            {
                seletInListImage = selectRandomImage( seletInListImage, listImage, false );
                document.querySelector( ".card-back img" ).src = seletInListImage[ 1 ];
                document.querySelector( ".card-front img" ).src = seletInListImage[ 0 ];
                clique = 0;
            }

            // console.log( "Clique: ", clique );

            // document.querySelector( ".card" ).classList.toggle( "clicked" );
            var card = document.querySelector( ".card" );
            if ( card.classList.contains( "rotate" ) )
            {
                card.classList.remove( "rotate" );
            } else
            {
                card.classList.add( "rotate" );
            }

            document.getElementById( "button-gallery" ).disabled=false;

        } );
    }

} );
