const store = require("./store")


const getAllPost = async (country, city, skill) => {
    
    let getIt = await store.get(country, city, skill)
    return getIt
    
}


const addPost = (title, salary, rating, description, company, url, skill, user, country, city , image) => {
    return new Promise((resolve, reject) => {
        if (!title || !salary || !rating || !description || !company || !url || !skill || !user || !country || !city) {
            console.log("[CONTROLLER] invalid data form")
            reject('Missing data')
          }

          let fileUrl = ""
          if (image){
              fileUrl = `http://localhost:4000/app/files/${image.filename}`
          }

        const post = {
            title,
            image: fileUrl,
            salary,
            rating,
            description,
            company,
            url,
            skill,
            user,
            country,
            city
          }
          store.add(post)

          finalResponse = {
              post,
              "System message": "Post successfully created"
          }

          resolve(finalResponse)
    })
}


const updatePost = (id, title, salary, rating, description, company, url, skill, user, country, city, image) => {
    return new Promise((resolve, reject) => {

        if(!id || !title || !salary || !rating || !description || !company || !url || !skill || !user || !country || !city ){
            reject("Missing data")
        }

        let fileUrl = ""
          if (image){
              fileUrl = `http://localhost:4000/app/files/${image.filename}`
          }

        const post = {
            title,
            image: fileUrl,
            salary,
            rating,
            description,
            company,
            url,
            skill,
            user,
            country,
            city
          }
          
        const result = store.update(id, post)
        
        let finalResponse = {
            post,
            "System Message" : "Post succesfully updated"
        }
        resolve(finalResponse)
    })
}


const deletePost = (id) => {
    return new Promise ((resolve, reject) => {
        if(!id) {
            reject("Missing data")
        }

        store.remove(id)
            .then(() => {
                resolve("Post deleted")
            })
            .catch(error => {
                reject(error)
            })
    })
}

module.exports = {
    addPost,
    getAllPost,
    updatePost,
    deletePost
}
