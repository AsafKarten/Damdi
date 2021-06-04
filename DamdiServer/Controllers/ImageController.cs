using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Net;
using System.Net.Http;
using DamdiServer.Models;
using System.Web.Http;
using static DamdiServer.Models.Image;
using System.Web;
using System.IO;

namespace DamdiServer.Controllers
{
    public class ImageController : ApiController
    {
        [HttpPost]
        public IHttpActionResult UploadImage([FromBody] Img image)
        {
            //create the response object
            ImgRes res = new ImgRes();

            try
            {
                //path
                string path = HttpContext.Current.Server.MapPath(@"~/uploads/" + image.folder);

                //create directory if not exists
                if (!Directory.Exists(path))
                    Directory.CreateDirectory(path);

                //create the image data
                string imageName = image.name + ".jpg";
                string imagePath = Path.Combine(path, imageName);
                byte[] imageBytes = Convert.FromBase64String(image.base64);

                //write the image and save it
                File.WriteAllBytes(imagePath, imageBytes);

                //update the resposne object    
                res.path = $"{Server.GetServerUrl()}/{image.folder}/{imageName}";
                res.isOk = true;
                //send path to user id
                int rows = Globals.UserDAL.UpdateUserImage(res.path, image.folder.Split('_')[1]);
                if (rows >= 1)
                {
                    return Ok(res);
                }
                return BadRequest("error while update the users table");
            }
            catch (Exception e)
            {
                res.message = e.Message;
                res.isOk = false;
                return Content(HttpStatusCode.BadRequest, res);
            }
        }
    }
}
