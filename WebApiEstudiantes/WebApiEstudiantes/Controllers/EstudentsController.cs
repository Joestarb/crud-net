using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApiEstudiantes.Context;
using WebApiEstudiantes.Models;

namespace WebApiEstudiantes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstudentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EstudentsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Estudents
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Estudent>>> GetStudents()
        {
            return await _context.Students.ToListAsync();
        }

        // GET: api/Estudents/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Estudent>> GetEstudent(int id)
        {
            var estudent = await _context.Students.FindAsync(id);

            if (estudent == null)
            {
                return NotFound();
            }

            return estudent;
        }

        // PUT: api/Estudents/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEstudent(int id, Estudent estudent)
        {
            if (id != estudent.id)
            {
                return BadRequest();
            }

            _context.Entry(estudent).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EstudentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Estudents
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Estudent>> PostEstudent(Estudent estudent)
        {
            _context.Students.Add(estudent);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEstudent", new { id = estudent.id }, estudent);
        }

        // DELETE: api/Estudents/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEstudent(int id)
        {
            var estudent = await _context.Students.FindAsync(id);
            if (estudent == null)
            {
                return NotFound();
            }

            _context.Students.Remove(estudent);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EstudentExists(int id)
        {
            return _context.Students.Any(e => e.id == id);
        }
    }
}
