$(document).ready(function() {
  // Global Settings
  let edit = false;

  // Testing Jquery
  console.log('jquery is working!');
  fetchTasks();
  $('#task-result').hide();

  // search key type event
  $('#search').keyup(function() {
    if($('#search').val()) {
      let search = $('#search').val();
      $.ajax({
        url: 'task-search.php',
        data: {search},
        type: 'POST',
        success: function (response) {
          if(!response.error) {
            let trimmedResponse = response.trim();
            let tasks = JSON.parse(trimmedResponse);
            let template = '';
            tasks.forEach(task => {
              template += 
              `
                <li><a href="#" class="task-item">${task.name} ${task.apellido} | ${task.dni} | ${task.mail}</a></li>
              ` 
            });
            $('#task-result').show();
            $('#container').html(template);
          }
        } 
      })
    }
    else
    {
      $('#task-result').hide();
    }
  });

  $('#task-form').submit(e => {
    e.preventDefault();
    const postData = {
      name: $('#name').val(),
      apellido: $('#apellido').val(),
      id: $('#taskId').val(),
      dni: $('#dni').val(),
      mail: $('#mail').val()
    };
    const url = edit === false ? 'task-add.php' : 'task-edit.php';
    console.log(postData, url);
    $.post(url, postData, (response) => {
      console.log(response);
      $('#task-form').trigger('reset');
      fetchTasks();
    });
    edit= false;
  });

  // Fetching Tasks
  function fetchTasks() {
    $.ajax({
      url: 'tasks-list.php',
      type: 'GET',
      success: function(response) {
        const tasks = JSON.parse(response);
        let template = '';
        tasks.forEach(task => {
          template += `
                  <tr taskId="${task.id}">
                  <td>${task.id}</td>
                  <td>
                    ${task.name} 
                  </td>
                  <td>${task.apellido}</td>
                  <td>${task.dni}</td>
                  <td>${task.mail}</td>
                  <td>
                    <button class="task-delete btn btn-danger">
                     Delete 
                    </button>
                  </td>
                  <td>
                    <button class="task-item btn btn">
                     Edit 
                    </button>
                  </td>
                  </tr>
                `
        });
        $('#tasks').html(template);
      }
    });
  }

  // Get a Single Task by Id 
  $(document).on('click', '.task-item', (e) => {
    const element = $(this)[0].activeElement.parentElement.parentElement;
    const id = $(element).attr('taskId');
    $.post('task-single.php', {id}, (response) => {
      console.log(response);
      const task = JSON.parse(response);
      $('#name').val(task.name);
      $('#apellido').val(task.apellido);
      $('#taskId').val(task.id);
      $('#dni').val(task.dni);
      $('#mail').val(task.mail);
      edit = true;
    });
    e.preventDefault();
  });

  // Delete a Single Task
  $(document).on('click', '.task-delete', (e) => {
    if(confirm('Are you sure you want to delete it?')) {
      const element = $(this)[0].activeElement.parentElement.parentElement;
      const id = $(element).attr('taskId');
      $.post('task-delete.php', {id}, (response) => {
        fetchTasks();
      });
    }
  });
});
