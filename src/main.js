const api_key='live_geYSXszokog3ojbfCEhUo9ym9dpFsrSU0JtXkqGWxpSjm7ux4xfV01buTPdTt9GH'
let urlFav='https://api.thecatapi.com/v1/favourites?limit=100&api_key=live_geYSXszokog3ojbfCEhUo9ym9dpFsrSU0JtXkqGWxpSjm7ux4xfV01buTPdTt9GH'

const urlUpload = 'https://api.thecatapi.com/v1/images/upload';
msg=console.log;

async function NewCat (){
    try {
    let resp = await fetch("https://api.thecatapi.com/v1/images/search?limit=2");
    let data =await  resp.json();
    //msg(data)
    for (let i=1;i<3;i++){
        let cat=document.getElementById(`img${i}`)
        //msg(cat)
        cat.src=`${data[i].url}`

        // await saveNewCat ();
    }
    let btn2= document.getElementById('btn2');
    let btn1= document.getElementById('btn1');
    btn1.onclick = () => saveNewCat(data[1].id)
    btn2.onclick = () =>  saveNewCat(data[2].id)
} 
    catch (error) {
     msg(error)   
    }
}

async function saveNewCat (id){
    try {
        var rawBody = JSON.stringify({image_id: id});
        msg('Save')
        const newFavourite = await fetch( "https://api.thecatapi.com/v1/favourites?limit=3&api_key=live_geYSXszokog3ojbfCEhUo9ym9dpFsrSU0JtXkqGWxpSjm7ux4xfV01buTPdTt9GH",{
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                } ,
                body: rawBody
            }
        )  
        let data =await newFavourite.json();
        // msg('==');
        msg(data);
        
        favCat (urlFav)
        //location.reload();
    } catch (error) {
        msg(error)
    }
}

async function favCat (urlFav){
    try {
        let resp = await fetch(urlFav);
        let data =await  resp.json();
        msg('FavCAts')
        //msg(data)
        const section = document.querySelector('.favourite')
        section.innerHTML = "";
        data.forEach(cats => {
            msg(cats)

            const card=  document.createElement('div')
            card.classList.add('card');
            
            section.appendChild(card);

            const info=  document.createElement('div')
            info.classList.add('info');
            info.textContent = 'Card';
            card.appendChild(info);
            const h2 = document.createElement('h2');
            h2.textContent = 'My cats list';
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('remove cat from favorites');
    
            img.src = cats.image.url;
            img.width = 150;
            btn.appendChild(btnText);
            btn.onclick= () =>   DeleteCat(cats.id);
            card.appendChild(img);
            info.appendChild(h2);
            info.appendChild(btn);
            //location.reload();
            //DeleteCat(cats.id)
            }); 

    }   
    
    catch (error) {
         msg(error)   
    }
}

async function DeleteCat (id){
    const urlDelet = `https://api.thecatapi.com/v1/favourites/${id}?api_key=live_geYSXszokog3ojbfCEhUo9ym9dpFsrSU0JtXkqGWxpSjm7ux4xfV01buTPdTt9GH`;
    //msg(urlDelet)
    try {
        let resp = await fetch(urlDelet,{
            method: 'DELETE',
          });
        let data = await  resp.json();

        favCat (urlFav)
    } catch (error) {
        msg(error)
    }
}
let reload = document.querySelector('.reload')
       reload.addEventListener('click', () => {
        alert(`You clicked on`);
        //location.reload();
        NewCat ()
        });

async function uploadCat(){
    const form= document.querySelector('#formUpload')
    const formData = new FormData(form);
    msg(formData.get('file'))
    try {
        

        const res = await fetch(urlUpload, {
          method: 'POST',
          headers: {
            'X-API-KEY': api_key,
          },
          body: formData,
        })
        const data = await res.json();

        msg('Foto de michi subida :)')
        msg({data})
        msg(data.url)
        saveNewCat (data.id);
    } catch (error) {
        alert('Choose a cat image')
        msg(error)
    }
}        
NewCat ();
favCat (urlFav)



//});
//document.addEventListener('DOMContentLoaded', () => {
//  const cards = document.querySelectorAll('.card');
//   cards.forEach(card => {
//       card.addEventListener('click', () => {
//           alert(`You clicked on ${card.querySelector('h2').innerText}`);
//        });
//    });
//});
//saveNewCat ();