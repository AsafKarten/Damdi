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
                string path = HttpContext.Current.Server.MapPath($@"~/Users/{image.Folder}");

                //create directory if not exists
                if (!Directory.Exists(path))
                    Directory.CreateDirectory(path);

                //create the image data
                string imageName = image.Name + "." + image.Type;
                string imagePath = Path.Combine(path, imageName);
                byte[] imageBytes = Convert.FromBase64String(image.Uri);

                //write the image and save it
                File.WriteAllBytes(imagePath, imageBytes);

                //update the resposne object
                res.Path = $@"{Server.GetServerUrl()}/Users/{image.Folder}/{imageName}";
                res.IsOk = true;
                Globals.UserDAL.SaveNewProfilePhotoToDB(res.Path, image.Folder);
                return Ok(res);
            }
            catch (Exception e)
            {
                res.Message = e.Message;
                res.IsOk = false;
                return Content(HttpStatusCode.BadRequest, res);
            }
        }
    }
}
