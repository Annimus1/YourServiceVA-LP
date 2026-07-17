export function setupTalentDashboard(containerId: string) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="max-w-4xl mx-auto p-6">
      <div class="flex space-x-4 mb-8">
        <button id="btn-matches" class="tab-btn pb-2 border-b-2 border-brand-blue font-bold cursor-pointer">Generate Best Matches</button>
        <button id="btn-status" class="tab-btn pb-2 text-gray-500 cursor-pointer">Update Agent Status</button>
      </div>
      <div id="content-area"></div>
    </div>
  `;

  const contentArea = document.getElementById('content-area');
  const btnMatches = document.getElementById('btn-matches');
  const btnStatus = document.getElementById('btn-status');

  // Función para cambiar de vista
  const renderView = (view: 'matches' | 'status') => {
    // Actualizar estilos de tabs
    btnMatches?.classList.toggle('border-b-2', view === 'matches');
    btnMatches?.classList.toggle('border-brand-blue', view === 'matches');
    btnMatches?.classList.toggle('font-bold', view === 'matches');
    btnMatches?.classList.toggle('text-gray-500', view !== 'matches');

    btnStatus?.classList.toggle('border-b-2', view === 'status');
    btnStatus?.classList.toggle('border-brand-blue', view === 'status');
    btnStatus?.classList.toggle('font-bold', view === 'status');
    btnStatus?.classList.toggle('text-gray-500', view !== 'status');

    if (view === 'matches') {
      contentArea!.innerHTML = `
        <button id="fetch-btn" class="bg-brand-dark-blue text-white px-4 py-2 rounded cursor-pointer">Buscar Mejores Agentes</button>
        <div id="results" class="mt-6"></div>
      `;
      document.getElementById('fetch-btn')?.addEventListener('click', handleFetch);
    } else {
      contentArea!.innerHTML = `
        <form id="status-form" class="space-y-4 p-6 bg-[#FAF8F5] rounded shadow-sm">
          <div>
            <label class="block mb-1">Phone Number</label>
            <input type="text" id="phone" class="w-full bg-white outline-0 p-2 rounded" required />
          </div>
          <div>
            <label class="block mb-1">Client</label>
            <input type="text" id="client" class="w-full bg-white outline-0 p-2 rounded" placeholder="Dejar en blanco si no aplica" />
          </div>
          <div>
            <label class="block mb-1">Status</label>
            <select id="status" class="w-full bg-white outline-0 p-2 rounded">
              <option value="available">Available</option>
              <option value="selected">Selected</option>
              <option value="contract">Contract</option>
            </select>
          </div>
          <div class="flex justify-end">
            <button type="submit" class="status-submit-btn bg-brand-green text-white px-4 py-2 rounded transition-colors">Update Status</button>
          </div>
        </form>
      `;
      
      // Integración del Formulario con la función unificada
      document.getElementById('status-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const phone = (document.getElementById('phone') as HTMLInputElement).value;
        const client = (document.getElementById('client') as HTMLInputElement).value;
        const status = (document.getElementById('status') as HTMLSelectElement).value;
        const submitBtn = e.target?.querySelector('button[type="submit"]') as HTMLButtonElement;
        
        await updateStatus(phone, client, status, submitBtn);
        setTimeout(() => {
          document.getElementById('status-form')!.reset();
        }, 2500);
      });
    }
  };

  // Lógica de fetch de agentes
  async function handleFetch() {
    // evaluamos el token antes de hacer la petición
    validateSession();

    const btn = document.getElementById('fetch-btn') as HTMLButtonElement;
    const resultsDiv = document.getElementById('results');
    btn.textContent = 'Consultando...';
    btn.disabled = true;
    try {
      const response = await fetch('https://n8n-n8n.tfpyme.easypanel.host/webhook/c8f94ee6-aaea-4ee4-a1da-e84c57070b63', { method: 'GET' });
      const data = await response.json();
      console.log('Datos recibidos:', data);
      
      resultsDiv!.innerHTML = data.parsed_data.map((pos: any) => `
        <div class="bg-[#FAF8F5] p-4 rounded shadow-sm mb-6">
            <h2 class="text-xl font-bold mb-4">${pos.position_title} - ${pos.client}</h2>
            ${pos.top_matches.map((agent: any) => `
            <div class="mb-4 p-4 bg-white rounded">
                <div class="flex flex-col">
                    <h3 class="font-bold text-lg">${agent.agent_name} - ${agent.match_score_percentage}%</h3>
                    <p class="text-sm italic mb-2">${agent.justification}</p>
                </div>
                <!-- Formulario individual por agente -->
                <div class="mt-4 p-3 rounded shadow-inner flex items-center justify-between">
                    <p class="bg-[#FAF8F5] text-xs font-semibold uppercase text-gray-500 px-2 py-2">Phone: ${agent.phone}</p>
                    <div class="flex gap-2 mt-2">
                        <select class="status-select border p-1 rounded" data-phone="${agent.phone}">
                          <option value="available">Available</option>
                          <option value="selected">Selected</option>
                          <option value="contract">Contract</option>
                        </select>
                        <!-- Eliminamos el onclick inline y delegamos al EventListener inferior -->
                        <button class="update-btn bg-brand-dark-blue hover:bg-brand-blue text-white px-3 py-1 rounded transition-colors" 
                                data-phone="${agent.phone}" 
                                data-client="${pos.client}">
                          Update Status
                        </button>
                    </div>
                </div>
            </div>
            `).join('')}
        </div>
        `).join('');

        // Integración de Botones Individuales con la función unificada
        resultsDiv?.querySelectorAll('.update-btn').forEach(btn => {
          btn.addEventListener('click', async (e) => {
              const target = e.target as HTMLButtonElement;
              const phone = target.getAttribute('data-phone') || '';
              const client = target.getAttribute('data-client') || '';
              const select = target.parentElement?.querySelector('.status-select') as HTMLSelectElement;
              const status = select.value;
              
              await updateStatus(phone, client, status, target);
          });
        });
    } catch (err) {
      resultsDiv!.innerHTML = `<p class="text-red-500">Error al cargar datos.</p>`;
    } finally {
      btn.textContent = 'Buscar Mejores Agentes';
      btn.disabled = false;
    }
  }

  // Función unificada y mejorada para actualizar estados
  async function updateStatus(phone: string, client: string, status: string, buttonElement: HTMLButtonElement) {
    // Evaluamos el token
    validateSession();
    
    const url = 'https://n8n-n8n.tfpyme.easypanel.host/webhook/c8f94ee6-aaea-4ee4-a1da-e84c57070b63';
    
    // Guardamos el estado original del botón
    const originalText = buttonElement.textContent;
    const originalBg = Array.from(buttonElement.classList).find(cls => cls.startsWith('bg-'));

    // Estado de carga
    buttonElement.textContent = 'Updating...';
    buttonElement.disabled = true;
    buttonElement.classList.add('opacity-75', 'cursor-not-allowed');

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.iaA2OXpVEN9c2R0QuWHQ2Q24t3KHR-uLN_pAYHT4KO8'
        },
        body: JSON.stringify({ 
          phone, 
          client: client.trim() === '' ? 'empty' : client.trim(),
          status 
        })
      });

      if (!response.ok) throw new Error('Error en la petición');

      // SOLUCIÓN: Leemos primero como texto plano para evitar que truene si viene vacío
      const responseText = await response.text();
      let data = {};
      if (responseText) {
        data = JSON.parse(responseText);
        console.log('Actualización exitosa (JSON):', data);
      } else {
        console.log('Actualización exitosa (Respuesta vacía 200 OK)');
      }

      // Feedback visual de éxito
      buttonElement.textContent = 'Success!';
      if (originalBg) buttonElement.classList.replace(originalBg, 'bg-green-600');

    } catch (error) {
      console.error('Error al actualizar el estado:', error);
      
      // Feedback visual de error
      buttonElement.textContent = 'Error!';
      if (originalBg) buttonElement.classList.replace(originalBg, 'bg-red-600');
    } finally {
      // Restaurar el botón después de 2.5 segundos
      setTimeout(() => {
        buttonElement.textContent = originalText;
        buttonElement.disabled = false;
        buttonElement.classList.remove('opacity-75', 'cursor-not-allowed');
        buttonElement.classList.remove('bg-green-600', 'bg-red-600');
        if (originalBg) buttonElement.classList.add(originalBg);
      }, 2500);
    }
  }

  // Eventos de navegación
  btnMatches?.addEventListener('click', () => renderView('matches'));
  btnStatus?.addEventListener('click', () => renderView('status'));

  // Carga inicial
  renderView('matches');

  const validateSession = async () => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      window.location.href = '/login';
      return;
    }

    try {
      const response = await fetch("https://n8n-n8n.tfpyme.easypanel.host/webhook/70cd552a-1f30-49f7-8337-6f4963b65c58", {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 401) {
        localStorage.removeItem('authToken');
        window.location.href = '/login';
      } else {
        // Si todo está bien, continuamos.
        return;
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    //   window.location.href = '/login';
    }
  };
}