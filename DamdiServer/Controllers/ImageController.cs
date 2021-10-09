using System;
using System.Net;
using DamdiServer.Models;
using System.Web.Http;
using System.Web;
using System.IO;
using static DamdiServer.Models.ProfileImage;

namespace DamdiServer.Controllers
{
    public class ImageController : ApiController
    {
        [Route("api/uploadpicture")]
        [HttpPost]
        public IHttpActionResult UploadImage([FromBody] Img image)
        {
            //create the response object
            ImgRes res = new ImgRes();
            try
            {
                //path
                string path = HttpContext.Current.Server.MapPath(@"~/Users/" + image.folder);

                //create directory if not exists
                if (!Directory.Exists(path))
                    Directory.CreateDirectory(path);

                //create the image data
                string imageName = image.name + "." + image.type;
                string imagePath = Path.Combine(path, imageName);
                byte[] imageBytes = Convert.FromBase64String(image.uri);

                //write the image and save it
                File.WriteAllBytes(imagePath, imageBytes);

                //update the resposne object
                res.path = $"{Server.GetServerUrl()}/Users/{image.folder}/{imageName}";
                res.isOk = true;
                Globals.UserDAL.SaveNewProfilePhotoToDB(res.path, image.folder);
                return Ok(res);
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
