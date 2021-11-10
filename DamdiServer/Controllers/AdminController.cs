using DamdiServer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;

namespace DamdiServer.Controllers
{
    public class AdminController : ApiController
    {
        //Get manager from managers table.
        [HttpPost]
        [Route("api/admin")]
        public IHttpActionResult GetAdminFromDB([FromBody] Admin admin)
        {
            try
            {
                Admin checked_admin = null;
                checked_admin = Globals.AdminDAL.GetAdmin(admin);
                if (checked_admin != null)
                    return Ok(checked_admin);
                return Content(HttpStatusCode.NotFound, $"Admin {admin.Personal_id} details is incorrect");

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        //[HttpPost]
        //[Route("api/delete")]
        //public IHttpActionResult DeleteUserFromDB([FromBody] Object user)
        //{
        //    try
        //    {
        //        int res = Globals.AdminDAL.DeleteUser(user);
        //        if (res == -1)
        //            return Content(HttpStatusCode.NotFound, $"User was not updated");
        //        return Ok(res);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}
    }
}
