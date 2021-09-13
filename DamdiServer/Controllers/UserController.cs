using DamdiServer.Models;
using System;
using System.Net;
using System.Web.Http;
using System.Web.Http.Cors;

namespace DamdiServer.Controllers
{
    public class UserController : ApiController
    {
        //Get One User from users table.
        [HttpPost]
        [Route("api/user")]
        public IHttpActionResult GetUserFromDB([FromBody] User user)
        {
            try
            {
                User checked_user = null;
                checked_user = Globals.UserDAL.GetUser(user);
                if (checked_user != null)
                    return Ok(checked_user);
                return Content(HttpStatusCode.NotFound, $"User {user.Personal_id} or pass or email is incorrect");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Add new user to users table.
        [HttpPost]
        [Route("api/add/post")]
        public IHttpActionResult AddNewUser([FromBody] User user)
        {
            try
            {
                Created(new Uri(Request.RequestUri.AbsoluteUri + user), Globals.UserDAL.SetNewUser(user));
                return Ok("User created successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Get User info from users table.
        [HttpPost]
        [Route("api/user/info")]
        public IHttpActionResult GetUserInfoFromDB([FromBody] Models.User ui)
        {
            try
            {
                ui = Globals.UserDAL.GetUserInfo(ui.Personal_id);
                if (ui == null)
                    return Content(HttpStatusCode.NotFound, $"User info {ui.Personal_id} was not found");
                return Ok(ui);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Post new User info into users table.
        [HttpPost]
        [Route("api/info/new")]
        public IHttpActionResult PostUserInfoIntoDB([FromBody] Models.User ui)
        {
            try
            {
                Created(new Uri(Request.RequestUri.AbsoluteUri + ui.Personal_id), Globals.UserDAL.SetNewUserInfo(ui));
                return Ok("User info created successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}


