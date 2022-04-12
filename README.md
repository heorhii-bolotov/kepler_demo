# Kepler For Analytics 

Please use: [Demo Website](https://flexversion-dot-kepler-dot-raketaapp-b9011.uc.r.appspot.com)

![](https://github.com/heorhraketa/kepler/blob/master/heatmap.jpg)
![](https://github.com/heorhraketa/kepler/blob/master/routes.jpg)

## All code for maintenance in `src/utils.js` and `src/App.js` 

## Run Locally

```shell
git clone git@github.com:heorhraketa/kepler.git
cd kepler
npm i
npm audit fix --force 
npm start 
```

## Deploy on App Engine 

```shell
npm run build 
gcloud app deploy
gcloud app browse

# or 
VERSION=flexversion
gcloud app deploy --no-promote --version=$VERSION --quiet
```

## References 

1. Kepler template  
- Video: https://youtu.be/BEZjt08Myxs
- https://github.com/leighhalliday/keplergl-demo/blob/master/src/App.js

2. Documentation
- Github: https://github.com/keplergl/kepler.gl
- Website: https://docs.kepler.gl/docs/user-guides/b-kepler-gl-workflow/a-add-data-to-the-map

3. Deploy React App on GCP
- Medium: https://betterprogramming.pub/deploy-a-react-app-to-google-cloud-platform-using-google-app-engine-3f74fbd537ec
- Medium, App Engine: https://medium.com/google-cloud/app-engine-project-cleanup-9647296e796a
