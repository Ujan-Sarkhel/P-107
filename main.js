animal_dog=0
animal_cat=0

function startClassification()
{
    navigator.mediaDevices.getUserMedia({audio:true, video:false})
    classifier = ml5.soundClassifier("https://teachablemachine.withgoogle.com/models/yiZeGqm_O/model.json", { probabilityThreshold: 0.7 } ,modelReady)
}

function modelReady()
{
    classifier.classify(gotResults);
}

function gotResults(error, results)
{
    if (error)
    {
        console.error(error);
    }
    else 
    {
        random_number_r = Math.floor(Math.random() * 255) + 1;
        random_number_g = Math.floor(Math.random() * 255) + 1;
        random_number_b = Math.floor(Math.random() * 255) + 1;

        document.getElementById("sui").innerHTML="Detected voice is of -" + results[0].label;
        document.getElementById("dog").innerHTML="Detected Dog - " + animal_dog + "Detected cat - " + animal_cat; 
        document.getElementById("sui").style.color="rgb("+random_number_r+","+random_number_g+","+random_number_b+")";
        document.getElementById("dog").style.color="rgb("+random_number_r+","+random_number_g+","+random_number_b+")";

        img1 = document.getElementById("image_default")
        if (results[0].label=="Background Noise")
        {
            img1.src="listen.gif"
        }

        else if (results[0].label=="Barking")
        {
            img1.src="bark.gif"
            animal_dog=animal_dog+1
            
        }

        else if (results[0].label=="Meowing")
        {
            img1.src="meow.gif"
            animal_cat=animal_cat+1     
        }        
    }
}