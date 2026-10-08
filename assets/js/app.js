// Parishisht Construction - Universal Client-Side Application Engine
const ParishishtApp = {
      state: {
        lang: localStorage.getItem('parishisht_lang') || 'en',
        viewMode: 'bento',
        categoryFilter: 'all',
        districtFilter: 'all',
        searchQuery: '',
        sortBy: 'progress-desc',
        activeRadarDistrict: 'dist-patna',
        estimatorSector: 'phe',
        activeFleetCategory: 'all',
        countersAnimated: false
      },

      init() {
        const urlParams = new URLSearchParams(window.location.search);
        const sectorParam = urlParams.get('sector');
        const distParam = urlParams.get('district');
        const projParam = urlParams.get('id');

        if (sectorParam) this.state.categoryFilter = sectorParam;
        if (distParam) this.state.districtFilter = distParam;

        this.highlightActiveNav();
        this.renderRadar();
        this.renderProjects();
        this.renderEstimatorInputs();
        this.recomputeEstimator();
        this.renderMachinery();
        this.setupFleetDrag();
        this.initCounterObserver();
        this.setupKeyboardShortcuts();
        this.applyLanguage(this.state.lang);

        if (projParam) {
          setTimeout(() => this.openProjectDossier(projParam), 250);
        }

        if (window.lucide) lucide.createIcons();
      },

      highlightActiveNav() {
        const path = window.location.pathname;
        let page = path.split('/').pop();
        if (!page || page === '') page = 'index.html';
        
        document.querySelectorAll('nav a[href], header a[href], aside a[href], #mobile-drawer a[href]').forEach(el => {
          const href = el.getAttribute('href');
          if (!href) return;
          const targetPage = href.split('#')[0];
          if (targetPage === page) {
            el.classList.add('nav-active');
            if (el.classList.contains('desktop-nav-link')) {
              el.classList.remove('text-slate-700');
              el.classList.add('text-royalBlue-600', 'font-bold', 'border-b-2', 'border-royalBlue-600');
            }
            if (el.classList.contains('mobile-dock-link')) {
              el.classList.remove('text-slate-500');
              el.classList.add('text-royalBlue-600', 'font-bold');
            }
            if (el.classList.contains('drawer-nav-link')) {
              el.classList.remove('text-slate-800', 'bg-slate-50');
              el.classList.add('text-royalBlue-700', 'bg-royalBlue-50', 'font-bold', 'border-royalBlue-300');
            }
          }
        });
      },

      // Language Switcher
      toggleLanguage() {
        const next = this.state.lang === 'en' ? 'hi' : 'en';
        this.applyLanguage(next);
        this.showToast(this.translate(next === 'hi' ? 'toast-lang-hi' : 'toast-lang-en'), 'info');
      },

      applyLanguage(lang) {
        this.state.lang = lang;
        localStorage.setItem('parishisht_lang', lang);
        document.documentElement.lang = lang;

        const btnLabel = document.getElementById('lang-btn-label');
        const btnSub = document.getElementById('lang-btn-sub');
        if (btnLabel && btnSub) {
          btnLabel.textContent = lang === 'en' ? 'हिंदी' : 'English';
          btnSub.textContent = lang === 'en' ? '/ EN' : '/ HI';
        }

        // Translate data-i18n nodes
        document.querySelectorAll('[data-i18n]').forEach(el => {
          const key = el.getAttribute('data-i18n');
          if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
            el.textContent = TRANSLATIONS[lang][key];
          }
        });

        // Translate data-i18n-placeholder
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
          const key = el.getAttribute('data-i18n-placeholder');
          if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
            el.setAttribute('placeholder', TRANSLATIONS[lang][key]);
          }
        });

        // Re-render dynamic components with language awareness
        this.updateRadarInspector();
        this.renderProjects();
        this.renderMachinery();
        this.recomputeEstimator();

        if (window.lucide) lucide.createIcons();
      },

      translate(key) {
        const dict = TRANSLATIONS[this.state.lang] || TRANSLATIONS['en'];
        return dict[key] || key;
      },

      // Operations Radar Methods
      renderRadar() {
        const mapPinsContainer = document.getElementById('radar-map-pins');
        const quickTabsContainer = document.getElementById('district-quick-tabs');
        if (!mapPinsContainer || !quickTabsContainer) return;

        mapPinsContainer.innerHTML = '';
        quickTabsContainer.innerHTML = '';

        // Pin Coordinates percentage on map
        const coordsMap = {
          'dist-patna': { top: '50%', left: '42%' },
          'dist-muzaffarpur': { top: '35%', left: '46%' },
          'dist-bhagalpur': { top: '58%', left: '76%' },
          'dist-gaya': { top: '72%', left: '38%' },
          'dist-darbhanga': { top: '32%', left: '56%' },
          'dist-nalanda': { top: '62%', left: '48%' }
        };

        DISTRICTS_RADAR.forEach(d => {
          const pos = coordsMap[d.id] || { top: '50%', left: '50%' };
          const isActive = this.state.activeRadarDistrict === d.id;
          
          // Map Pin
          const pin = document.createElement('div');
          pin.className = "absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group min-w-[44px] min-h-[44px] flex items-center justify-center";
          pin.style.top = pos.top;
          pin.style.left = pos.left;
          pin.onclick = () => this.selectRadarDistrict(d.id);
          pin.innerHTML = `
            <div class="relative flex items-center justify-center">
              <span class="w-6 h-6 rounded-full ${isActive ? 'bg-amberGold-500/30' : 'bg-royalBlue-500/20'} pulse-ring absolute"></span>
              <span class="w-3.5 h-3.5 rounded-full ${isActive ? 'bg-amberGold-500 scale-125' : 'bg-royalBlue-600'} border-2 border-white shadow-md group-hover:scale-125 transition-transform"></span>
              <span class="absolute top-4 font-mono text-[9px] font-bold ${isActive ? 'text-amberGold-700 border-amberGold-300 bg-amberGold-50' : 'text-slate-800 border-slate-200 bg-white/95'} px-1.5 py-0.5 rounded border whitespace-nowrap shadow-sm group-hover:text-royalBlue-600">
                ${this.state.lang === 'hi' ? d.name_hi : d.name}
              </span>
            </div>
          `;
          mapPinsContainer.appendChild(pin);

          // Quick Tab
          const tab = document.createElement('button');
          tab.className = `px-3.5 py-2.5 min-h-[44px] rounded-xl text-xs font-mono font-bold transition-all text-center whitespace-nowrap active:scale-95 border ${isActive ? 'bg-royalBlue-50 text-royalBlue-700 border-royalBlue-300 shadow-sm' : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border-slate-200'}`;
          tab.textContent = this.state.lang === 'hi' ? d.name_hi : d.name;
          tab.onclick = () => this.selectRadarDistrict(d.id);
          quickTabsContainer.appendChild(tab);
        });

        this.updateRadarInspector();
      },

      selectRadarDistrict(distId) {
        this.state.activeRadarDistrict = distId;
        this.renderRadar();
        const d = DISTRICTS_RADAR.find(x => x.id === distId);
        const name = d ? (this.state.lang === 'hi' ? d.name_hi : d.name) : distId;
        this.showToast(`Selected ${name} Radar Hub`, 'info');
      },

      updateRadarInspector() {
        if (!document.getElementById('telemetry-role')) return;
        const d = DISTRICTS_RADAR.find(x => x.id === this.state.activeRadarDistrict) || DISTRICTS_RADAR[0];
        const isHi = this.state.lang === 'hi';

        document.getElementById('telemetry-role').textContent = isHi ? d.role_hi : d.role;
        document.getElementById('telemetry-name').textContent = isHi ? d.name_hi : d.name;
        document.getElementById('telemetry-coords').textContent = d.coords;
        document.getElementById('telemetry-batching').textContent = isHi ? d.batchingCap_hi : d.batchingCap;
        document.getElementById('telemetry-fleet').textContent = isHi ? d.fleet_hi : d.fleet;
        document.getElementById('telemetry-package').textContent = isHi ? d.package_hi : d.package;
        document.getElementById('telemetry-qalab').textContent = isHi ? d.qaLab_hi : d.qaLab;
      },

      filterByDistrictFromRadar() {
        const d = DISTRICTS_RADAR.find(x => x.id === this.state.activeRadarDistrict) || DISTRICTS_RADAR[0];
        const select = document.getElementById('proj-district-filter');
        if (select) {
          select.value = d.name;
          this.setDistrictFilter(d.name);
          const projEl = document.getElementById('projects');
          if (projEl) projEl.scrollIntoView({ behavior: 'smooth' });
          this.showToast(`Filtered projects for ${d.name} district`, 'info');
        } else {
          window.location.href = `projects.html?district=${encodeURIComponent(d.name)}`;
        }
      },

      // Projects Explorer Methods
      setViewMode(mode) {
        this.state.viewMode = mode;
        const bentoView = document.getElementById('projects-bento-view');
        const tableView = document.getElementById('projects-table-view');
        const corridorView = document.getElementById('projects-corridor-view');

        const btnBento = document.getElementById('btn-view-bento');
        const btnTable = document.getElementById('btn-view-table');
        const btnCorridor = document.getElementById('btn-view-corridor');

        [btnBento, btnTable, btnCorridor].forEach(b => {
          b.className = "px-3.5 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 transition-all flex items-center gap-1.5";
        });

        if (mode === 'bento') {
          bentoView.classList.remove('hidden');
          tableView.classList.add('hidden');
          corridorView.classList.add('hidden');
          btnBento.className = "px-3.5 py-1.5 rounded-lg bg-blueprint-600 text-white shadow transition-all flex items-center gap-1.5";
        } else if (mode === 'table') {
          bentoView.classList.add('hidden');
          tableView.classList.remove('hidden');
          corridorView.classList.add('hidden');
          btnTable.className = "px-3.5 py-1.5 rounded-lg bg-blueprint-600 text-white shadow transition-all flex items-center gap-1.5";
        } else if (mode === 'corridor') {
          bentoView.classList.add('hidden');
          tableView.classList.add('hidden');
          corridorView.classList.remove('hidden');
          btnCorridor.className = "px-3.5 py-1.5 rounded-lg bg-blueprint-600 text-white shadow transition-all flex items-center gap-1.5";
        }

        this.renderProjects();
        if (window.lucide) lucide.createIcons();
      },

      setFilter(cat) {
        if (document.getElementById('projects')) {
          this.setCategoryFilter(cat);
          document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
        } else {
          window.location.href = `projects.html?sector=${cat}`;
        }
      },

      setCategoryFilter(cat) {
        this.state.categoryFilter = cat;
        document.querySelectorAll('.cat-pill').forEach(btn => {
          if (btn.getAttribute('data-cat') === cat) {
            btn.className = "cat-pill px-3.5 py-2 rounded-lg text-xs font-bold bg-royalBlue-600 text-white transition-all shadow-sm whitespace-nowrap min-h-[40px] shrink-0 active:scale-95";
          } else {
            btn.className = "cat-pill px-3.5 py-2 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 border border-slate-200 transition-all whitespace-nowrap min-h-[40px] shrink-0 active:scale-95";
          }
        });
        this.renderProjects();
      },

      setDistrictFilter(dist) {
        this.state.districtFilter = dist;
        this.renderProjects();
      },

      handleSearch(query) {
        this.state.searchQuery = query.toLowerCase().trim();
        this.renderProjects();
      },

      setSort(sortKey) {
        this.state.sortBy = sortKey;
        this.renderProjects();
      },

      resetFilters() {
        this.state.categoryFilter = 'all';
        this.state.districtFilter = 'all';
        this.state.searchQuery = '';
        this.state.sortBy = 'progress-desc';

        const searchInput = document.getElementById('proj-search-input');
        const distSelect = document.getElementById('proj-district-filter');
        const sortSelect = document.getElementById('proj-sort-select');

        if (searchInput) searchInput.value = '';
        if (distSelect) distSelect.value = 'all';
        if (sortSelect) sortSelect.value = 'progress-desc';

        this.setCategoryFilter('all');
        this.showToast(this.translate('toast-reset'), 'info');
      },

      getFilteredProjects() {
        const isHi = this.state.lang === 'hi';
        return PROJECTS_DATA.filter(p => {
          const matchesCat = this.state.categoryFilter === 'all' || p.category === this.state.categoryFilter;
          const matchesDist = this.state.districtFilter === 'all' || p.district.toLowerCase() === this.state.districtFilter.toLowerCase();
          const q = this.state.searchQuery;
          const matchesSearch = q === '' ||
            p.title.toLowerCase().includes(q) ||
            p.title_hi.toLowerCase().includes(q) ||
            p.client.toLowerCase().includes(q) ||
            p.client_hi.toLowerCase().includes(q) ||
            p.district.toLowerCase().includes(q) ||
            p.location.toLowerCase().includes(q);
          return matchesCat && matchesDist && matchesSearch;
        }).sort((a, b) => {
          if (this.state.sortBy === 'progress-desc') return b.progress - a.progress;
          if (this.state.sortBy === 'value-desc') return b.valueNum - a.valueNum;
          if (this.state.sortBy === 'date-asc') return a.handoverDate.localeCompare(b.handoverDate);
          return 0;
        });
      },

      renderProjects() {
        const filtered = this.getFilteredProjects();
        const countEl = document.getElementById('projects-count-filtered');
        const emptyState = document.getElementById('projects-empty-state');
        if (countEl) countEl.textContent = filtered.length;

        if (filtered.length === 0) {
          if (emptyState) emptyState.classList.remove('hidden');
        } else {
          if (emptyState) emptyState.classList.add('hidden');
        }

        const isHi = this.state.lang === 'hi';

        // 1. Bento Grid View
        const bentoGrid = document.getElementById('projects-bento-view');
        if (bentoGrid) {
          bentoGrid.innerHTML = '';
          filtered.forEach(p => {
            const card = document.createElement('div');
            card.className = "bg-white rounded-3xl p-6 border border-slate-200 hover:border-royalBlue-400 hover:shadow-xl transition-all flex flex-col justify-between group cursor-pointer shadow-sm";
            card.onclick = () => this.openProjectDossier(p.id);

            const title = isHi ? p.title_hi : p.title;
            const client = isHi ? p.client_hi : p.client;
            const categoryLabel = isHi ? p.categoryLabel_hi : p.categoryLabel;
            const location = isHi ? p.location_hi : p.location;
            const desc = isHi ? p.desc_hi : p.desc;
            const status = isHi ? p.status_hi : p.status;

            card.innerHTML = `
              <div>
                <div class="flex justify-between items-center mb-3">
                  <span class="text-[10px] font-mono font-bold uppercase tracking-wider text-royalBlue-700 bg-royalBlue-50 px-2.5 py-0.5 rounded border border-royalBlue-200">
                    ${categoryLabel}
                  </span>
                  <span class="font-mono text-xs font-bold ${p.progress === 100 ? 'text-laserEmerald-600' : 'text-amberGold-600'} flex items-center gap-1">
                    <span class="w-2 h-2 rounded-full ${p.progress === 100 ? 'bg-laserEmerald-500' : 'bg-amberGold-500'}"></span> ${p.progress}%
                  </span>
                </div>
                
                <h4 class="font-extrabold text-slate-900 text-base group-hover:text-royalBlue-600 transition-colors leading-snug mb-1">${title}</h4>
                <div class="text-[11px] font-mono text-slate-500 mb-3">${client}</div>
                <p class="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">${desc}</p>
              </div>

              <div>
                <div class="pt-3 border-t border-slate-100 flex justify-between items-center text-xs font-mono mb-3">
                  <span class="text-slate-600"><i data-lucide="map-pin" class="w-3 h-3 inline text-amberGold-500 mr-1"></i>${location}</span>
                  <span class="font-bold text-amberGold-600">${p.value}</span>
                </div>

                <div class="w-full bg-slate-100 rounded-full h-2 overflow-hidden mb-3">
                  <div class="${p.progress === 100 ? 'bg-laserEmerald-500' : 'bg-royalBlue-600'} h-full rounded-full" style="width: ${p.progress}%"></div>
                </div>

                <div class="flex justify-between items-center text-[11px] font-mono">
                  <span class="text-slate-600 font-bold group-hover:text-royalBlue-600 flex items-center gap-1">
                    ${isHi ? 'विस्तृत विवरण देखें' : 'View Full Dossier'} <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                  </span>
                  <span class="${p.progress === 100 ? 'text-laserEmerald-600' : 'text-slate-500'} font-bold">${status}</span>
                </div>
              </div>
            `;
            bentoGrid.appendChild(card);
          });
        }

        // 2. Data Table View
        const tableBody = document.getElementById('projects-table-body');
        if (tableBody) {
          tableBody.innerHTML = '';
          filtered.forEach(p => {
            const row = document.createElement('tr');
            row.className = "hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-100";
            row.onclick = () => this.openProjectDossier(p.id);

            const title = isHi ? p.title_hi : p.title;
            const client = isHi ? p.client_hi : p.client;
            const status = isHi ? p.status_hi : p.status;

            row.innerHTML = `
              <td class="p-4 font-bold text-slate-900">${title}</td>
              <td class="p-4 text-slate-500">${client}</td>
              <td class="p-4 text-slate-700">${p.district}</td>
              <td class="p-4 font-bold text-amberGold-600">${p.value}</td>
              <td class="p-4">
                <span class="font-bold text-royalBlue-600">${p.progress}%</span>
              </td>
              <td class="p-4">
                <span class="px-2 py-0.5 rounded text-[10px] ${p.progress === 100 ? 'bg-laserEmerald-50 text-laserEmerald-700 border border-laserEmerald-200' : 'bg-royalBlue-50 text-royalBlue-700 border border-royalBlue-200'}">${status}</span>
              </td>
              <td class="p-4 text-right">
                <button class="px-2.5 py-1 rounded bg-slate-100 hover:bg-royalBlue-600 hover:text-white text-slate-700 transition-colors text-[10px]">Inspect</button>
              </td>
            `;
            tableBody.appendChild(row);
          });
        }

        // 3. Corridor View
        const corridorView = document.getElementById('projects-corridor-view');
        if (corridorView) {
          corridorView.innerHTML = '';
          const corridors = ['North Bihar', 'Gangetic Central', 'South Bihar'];
          corridors.forEach(corr => {
            const corridorProjects = filtered.filter(p => p.region === corr);
            if (corridorProjects.length === 0) return;

            const section = document.createElement('div');
            section.className = "bg-white p-6 rounded-3xl border border-slate-200 shadow-sm";
            section.innerHTML = `
              <div class="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
                <i data-lucide="map" class="w-4 h-4 text-royalBlue-600"></i>
                <h4 class="font-extrabold text-slate-900 text-base">${isHi ? (corr === 'North Bihar' ? 'उत्तर बिहार क्षेत्र' : (corr === 'South Bihar' ? 'दक्षिण बिहार क्षेत्र' : 'मध्य गंगा क्षेत्र')) : corr + ' Regional Corridor'}</h4>
                <span class="text-xs font-mono text-slate-500">(${corridorProjects.length} Packages)</span>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                ${corridorProjects.map(p => `
                  <div onclick="ParishishtApp.openProjectDossier('${p.id}')" class="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-royalBlue-400 hover:bg-white cursor-pointer flex justify-between items-center transition-all">
                    <div>
                      <div class="text-xs font-bold text-slate-900">${isHi ? p.title_hi : p.title}</div>
                      <div class="text-[10px] font-mono text-slate-500">${p.district} • ${p.value}</div>
                    </div>
                    <span class="text-xs font-mono font-bold text-royalBlue-600">${p.progress}%</span>
                  </div>
                `).join('')}
              </div>
            `;
            corridorView.appendChild(section);
          });
        }

        if (window.lucide) lucide.createIcons();
      },

      // Project Dossier Modal
      openProjectDossier(projId) {
        const p = PROJECTS_DATA.find(x => x.id === projId);
        if (!p) return;
        const modal = document.getElementById('project-dossier-modal') || document.getElementById('project-modal');
        if (!modal) {
          window.location.href = `projects.html?id=${projId}`;
          return;
        }
        const isHi = this.state.lang === 'hi';

        document.getElementById('mdossier-badge').textContent = isHi ? p.categoryLabel_hi : p.categoryLabel;
        document.getElementById('mdossier-status').textContent = isHi ? p.status_hi : p.status;
        document.getElementById('mdossier-title').textContent = isHi ? p.title_hi : p.title;
        document.getElementById('mdossier-client').textContent = isHi ? p.client_hi : p.client;
        document.getElementById('mdossier-loc').textContent = isHi ? p.location_hi : p.location;
        document.getElementById('mdossier-val').textContent = p.value;
        document.getElementById('mdossier-desc').textContent = isHi ? p.desc_hi : p.desc;
        document.getElementById('mdossier-fleet').textContent = isHi ? p.fleetDeployed_hi : p.fleetDeployed;

        // Specs
        const specsList = document.getElementById('mdossier-specs');
        specsList.innerHTML = '';
        const specs = isHi ? p.specs_hi : p.specs;
        specs.forEach(s => {
          const li = document.createElement('li');
          li.textContent = s;
          specsList.appendChild(li);
        });

        // Milestones
        const milesList = document.getElementById('mdossier-milestones-list');
        milesList.innerHTML = '';
        p.milestones.forEach(m => {
          const div = document.createElement('div');
          div.className = "p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center";
          div.innerHTML = `
            <div>
              <div class="font-bold text-slate-800">${m.phase}</div>
              <div class="text-[10px] text-slate-500">${m.date}</div>
            </div>
            <span class="text-[10px] px-2 py-0.5 rounded bg-royalBlue-50 text-royalBlue-700 border border-royalBlue-200 font-bold">${m.status}</span>
          `;
          milesList.appendChild(div);
        });

        this.setDossierTab('scope');
        this.openModal(modal.id);
        if (window.lucide) lucide.createIcons();
      },

      setDossierTab(tab) {
        ['scope', 'milestones', 'fleet'].forEach(t => {
          const btn = document.getElementById('dossier-tab-btn-' + t);
          const content = document.getElementById('dossier-tab-' + t);
          if (btn && content) {
            if (t === tab) {
              btn.className = "pb-2 text-royalBlue-600 border-b-2 border-royalBlue-600 font-bold whitespace-nowrap min-h-[38px]";
              content.classList.remove('hidden');
            } else {
              btn.className = "pb-2 text-slate-500 hover:text-slate-900 font-bold whitespace-nowrap min-h-[38px]";
              content.classList.add('hidden');
            }
          }
        });
      },

      // BOQ Estimator Methods
      setEstimatorSector(sec) {
        this.state.estimatorSector = sec;
        ['phe', 'roads', 'urban'].forEach(s => {
          const btn = document.getElementById('est-sec-' + s);
          if (btn) {
            if (s === sec) {
              btn.className = "py-2.5 rounded-lg bg-royalBlue-600 text-white shadow-sm transition-all min-h-[42px] active:scale-95";
            } else {
              btn.className = "py-2.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-all min-h-[42px] active:scale-95";
            }
          }
        });
        this.renderEstimatorInputs();
        this.recomputeEstimator();
      },

      renderEstimatorInputs() {
        const container = document.getElementById('estimator-dynamic-inputs');
        if (!container) return;
        const isHi = this.state.lang === 'hi';

        if (this.state.estimatorSector === 'phe') {
          container.innerHTML = `
            <div>
              <div class="flex justify-between text-xs font-mono text-slate-700 mb-1">
                <span data-i18n="est-lbl-scale1">${isHi ? 'वितरण पाइपलाइन नेटवर्क लंबाई (किमी)' : 'Distribution Pipeline Network Length (km)'}</span>
                <span id="est-val-pipe" class="font-bold text-royalBlue-600">85 km</span>
              </div>
              <input type="range" min="10" max="300" value="85" id="est-input-pipe" oninput="ParishishtApp.updatePipeSlider(this.value)" class="w-full h-8 sm:h-6 accent-royalBlue-600 bg-slate-200 rounded-lg cursor-pointer">
            </div>

            <div>
              <div class="flex justify-between text-xs font-mono text-slate-700 mb-1">
                <span data-i18n="est-lbl-scale2">${isHi ? 'उच्चस्तरीय सेवा जलाशय (OHSR संख्या)' : 'Over Head Service Reservoirs (OHSR Count)'}</span>
                <span id="est-val-ohsr" class="font-bold text-royalBlue-600">4 Units</span>
              </div>
              <input type="range" min="1" max="10" value="4" id="est-input-ohsr" oninput="ParishishtApp.updateOhsrSlider(this.value)" class="w-full h-8 sm:h-6 accent-royalBlue-600 bg-slate-200 rounded-lg cursor-pointer">
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label class="block text-xs font-mono text-slate-700 mb-1">${isHi ? 'OHSR टैंक क्षमता' : 'OHSR Tank Capacity'}</label>
                <select id="est-select-ohsrcap" onchange="ParishishtApp.recomputeEstimator()" class="custom-select w-full bg-white border border-slate-300 text-base sm:text-xs rounded-xl p-2.5 min-h-[44px] text-slate-800 font-mono shadow-xs hover:border-slate-400 focus:outline-none focus:border-royalBlue-600 focus:ring-2 focus:ring-royalBlue-500/20">
                  <option value="2.5">2.5 Lakh Liters</option>
                  <option value="4.5" selected>4.5 Lakh Liters</option>
                  <option value="7.5">7.5 Lakh Liters</option>
                  <option value="10.0">10.0 Lakh Liters</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-mono text-slate-700 mb-1">${isHi ? 'नल कनेक्शन (FHTC)' : 'Household Taps (FHTC)'}</label>
                <input type="number" inputmode="numeric" id="est-input-fhtc" value="22000" step="1000" oninput="ParishishtApp.recomputeEstimator()" class="w-full bg-white border border-slate-300 text-base sm:text-xs rounded-xl p-2.5 min-h-[44px] text-slate-900 font-mono focus:outline-none focus:border-royalBlue-600">
              </div>
            </div>
          `;
        } else if (this.state.estimatorSector === 'roads') {
          container.innerHTML = `
            <div>
              <div class="flex justify-between text-xs font-mono text-slate-700 mb-1">
                <span data-i18n="est-lbl-road-len">${isHi ? 'राजमार्ग / सड़क लंबाई (किमी)' : 'Highway / Road Length (km)'}</span>
                <span id="est-val-road" class="font-bold text-amberGold-600">24 km</span>
              </div>
              <input type="range" min="5" max="100" value="24" id="est-input-road" oninput="ParishishtApp.updateRoadSlider(this.value)" class="w-full h-8 sm:h-6 accent-amberGold-500 bg-slate-200 rounded-lg cursor-pointer">
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label class="block text-xs font-mono text-slate-700 mb-1">${isHi ? 'फुटपाथ प्रकार' : 'Pavement Type'}</label>
                <select id="est-select-pavement" onchange="ParishishtApp.recomputeEstimator()" class="custom-select w-full bg-white border border-slate-300 text-base sm:text-xs rounded-xl p-2.5 min-h-[44px] text-slate-800 font-mono shadow-xs hover:border-slate-400 focus:outline-none focus:border-royalBlue-600 focus:ring-2 focus:ring-royalBlue-500/20">
                  <option value="flexible" selected>Flexible Bituminous (IRC:37)</option>
                  <option value="rigid">Rigid PQC Concrete (IRC:58)</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-mono text-slate-700 mb-1">${isHi ? 'आरसीसी बॉक्स पुलिया' : 'RCC Box Culverts'}</label>
                <input type="number" inputmode="numeric" id="est-input-culverts" value="6" min="1" max="30" oninput="ParishishtApp.recomputeEstimator()" class="w-full bg-white border border-slate-300 text-base sm:text-xs rounded-xl p-2.5 min-h-[44px] text-slate-900 font-mono focus:outline-none focus:border-royalBlue-600">
              </div>
            </div>
          `;
        } else if (this.state.estimatorSector === 'urban') {
          container.innerHTML = `
            <div>
              <div class="flex justify-between text-xs font-mono text-slate-700 mb-1">
                <span data-i18n="est-lbl-drain-len">${isHi ? 'वर्षा जल नाला लंबाई (किमी)' : 'Stormwater Conduit Length (km)'}</span>
                <span id="est-val-drain" class="font-bold text-laserEmerald-600">4.2 km</span>
              </div>
              <input type="range" min="1" max="25" step="0.2" value="4.2" id="est-input-drain" oninput="ParishishtApp.updateDrainSlider(this.value)" class="w-full h-8 sm:h-6 accent-laserEmerald-500 bg-slate-200 rounded-lg cursor-pointer">
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label class="block text-xs font-mono text-slate-700 mb-1">${isHi ? 'बॉक्स ड्रेन आयाम' : 'Box Drain Cross-Section'}</label>
                <select id="est-select-drainbox" onchange="ParishishtApp.recomputeEstimator()" class="custom-select w-full bg-white border border-slate-300 text-base sm:text-xs rounded-xl p-2.5 min-h-[44px] text-slate-800 font-mono shadow-xs hover:border-slate-400 focus:outline-none focus:border-royalBlue-600 focus:ring-2 focus:ring-royalBlue-500/20">
                  <option value="2.0">Standard Box (2.0m x 1.5m)</option>
                  <option value="2.5" selected>Heavy Box (2.5m x 2.0m)</option>
                  <option value="4.0">Twin-Cell Box (4.0m x 2.5m)</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-mono text-slate-700 mb-1">${isHi ? 'पंपिंग स्टेशन' : 'Pumping Station LPM'}</label>
                <select id="est-select-pumping" onchange="ParishishtApp.recomputeEstimator()" class="custom-select w-full bg-white border border-slate-300 text-base sm:text-xs rounded-xl p-2.5 min-h-[44px] text-slate-800 font-mono shadow-xs hover:border-slate-400 focus:outline-none focus:border-royalBlue-600 focus:ring-2 focus:ring-royalBlue-500/20">
                  <option value="6000">6,000 LPM Station</option>
                  <option value="12000" selected>12,000 LPM High-Discharge</option>
                  <option value="24000">24,000 LPM Regional Flood</option>
                </select>
              </div>
            </div>
          `;
        }
      },

      updatePipeSlider(val) {
        document.getElementById('est-val-pipe').textContent = val + ' km';
        this.recomputeEstimator();
      },

      updateOhsrSlider(val) {
        document.getElementById('est-val-ohsr').textContent = val + ' Units';
        this.recomputeEstimator();
      },

      updateRoadSlider(val) {
        document.getElementById('est-val-road').textContent = val + ' km';
        this.recomputeEstimator();
      },

      updateDrainSlider(val) {
        document.getElementById('est-val-drain').textContent = val + ' km';
        this.recomputeEstimator();
      },

      recomputeEstimator() {
        if (!document.getElementById('est-out-cost')) return;
        const mult = parseFloat(document.getElementById('est-district-select')?.value || '1.08');
        let costCr = 0;
        let concreteM3 = 0;
        let timelineMo = 0;
        let fleetStr = "";

        if (this.state.estimatorSector === 'phe') {
          const pipeKm = parseFloat(document.getElementById('est-input-pipe')?.value || '85');
          const ohsrCount = parseInt(document.getElementById('est-input-ohsr')?.value || '4');
          costCr = ((pipeKm * 0.28) + (ohsrCount * 3.4)) * mult;
          concreteM3 = Math.round(ohsrCount * 850 + pipeKm * 40);
          timelineMo = Math.round(8 + (pipeKm * 0.06) + (ohsrCount * 0.5));
          fleetStr = `${Math.ceil(ohsrCount / 3)} Batching Plant(s), ${Math.ceil(pipeKm / 20) + 2} Transit Mixers, 2 Fusion Rigs`;
        } else if (this.state.estimatorSector === 'roads') {
          const roadKm = parseFloat(document.getElementById('est-input-road')?.value || '24');
          const culverts = parseInt(document.getElementById('est-input-culverts')?.value || '6');
          const isRigid = document.getElementById('est-select-pavement')?.value === 'rigid';
          const ratePerKm = isRigid ? 2.4 : 1.9;
          costCr = ((roadKm * ratePerKm) + (culverts * 0.8)) * mult;
          concreteM3 = Math.round(isRigid ? (roadKm * 2100 + culverts * 180) : (roadKm * 280 + culverts * 180));
          timelineMo = Math.round(6 + (roadKm * 0.35));
          fleetStr = `${Math.ceil(roadKm / 20)} Sensor Paver, ${Math.ceil(roadKm / 15)} Batching Plant, 4 Transit Mixers`;
        } else if (this.state.estimatorSector === 'urban') {
          const drainKm = parseFloat(document.getElementById('est-input-drain')?.value || '4.2');
          const pumpLpm = parseInt(document.getElementById('est-select-pumping')?.value || '12000');
          costCr = ((drainKm * 8.5) + (pumpLpm / 12000 * 6.2)) * mult;
          concreteM3 = Math.round(drainKm * 3200 + 450);
          timelineMo = Math.round(8 + (drainKm * 1.5));
          fleetStr = `2 Excavators, 1 Precast Crane Rig, 3 Transit Mixers, Dewatering Pumps`;
        }

        document.getElementById('est-out-cost').textContent = `₹${costCr.toFixed(2)} Cr.`;
        document.getElementById('est-out-concrete').textContent = `${concreteM3.toLocaleString()} m³`;
        document.getElementById('est-out-timeline').textContent = `${timelineMo} Months`;
        document.getElementById('est-out-fleet').textContent = fleetStr;
      },

      resetEstimator() {
        this.renderEstimatorInputs();
        this.recomputeEstimator();
        this.showToast(this.translate('toast-reset'), 'info');
      },

      copyEstimatorSummary() {
        const cost = document.getElementById('est-out-cost').textContent;
        const conc = document.getElementById('est-out-concrete').textContent;
        const time = document.getElementById('est-out-timeline').textContent;
        const fleet = document.getElementById('est-out-fleet').textContent;
        const text = `Parishisht Construction - BOQ Estimation Docket
Sector: ${this.state.estimatorSector.toUpperCase()}
Valuation: ${cost}
Concrete: ${conc}
Timeline: ${time}
Fleet: ${fleet}`;
        navigator.clipboard.writeText(text);
        this.showToast(this.translate('toast-copied'), 'success');
      },

      openBoqPrintModal() {
        const cost = document.getElementById('est-out-cost').textContent;
        const conc = document.getElementById('est-out-concrete').textContent;
        const time = document.getElementById('est-out-timeline').textContent;
        const fleet = document.getElementById('est-out-fleet').textContent;
        const ref = 'EST-2026-' + Math.floor(1000 + Math.random() * 9000);
        document.getElementById('boq-sheet-ref').textContent = ref;

        const content = document.getElementById('boq-sheet-content');
        content.innerHTML = `
          <div class="p-4 bg-slate-100 rounded-xl mb-4">
            <div><strong>Sector:</strong> ${this.state.estimatorSector.toUpperCase()} Public Infrastructure</div>
            <div><strong>Estimated Valuation:</strong> <span class="text-blue-900 font-bold">${cost}</span></div>
            <div><strong>Calculated Concrete Volume:</strong> ${conc}</div>
            <div><strong>Completion Timeline:</strong> ${time}</div>
            <div><strong>Fleet Allocation:</strong> ${fleet}</div>
          </div>
          <table class="w-full text-xs font-mono border-collapse border border-slate-300">
            <tr class="bg-slate-200">
              <th class="border p-2 text-left">Estimation Component</th>
              <th class="border p-2 text-left">Share</th>
              <th class="border p-2 text-left">Specification Standard</th>
            </tr>
            <tr>
              <td class="border p-2 font-semibold">Civil & Structural Works</td>
              <td class="border p-2">45%</td>
              <td class="border p-2">Bihar PWD Schedule of Rates (SOR)</td>
            </tr>
            <tr>
              <td class="border p-2 font-semibold">Pipes, Cement & Steel (TMT)</td>
              <td class="border p-2">30%</td>
              <td class="border p-2">BIS / IS:8329 / IS:1786 Fe 550D</td>
            </tr>
            <tr>
              <td class="border p-2 font-semibold">Plant & Machinery Deployment</td>
              <td class="border p-2">15%</td>
              <td class="border p-2">100% Captive Equipment Fleet</td>
            </tr>
            <tr>
              <td class="border p-2 font-semibold">Quality Control & Contingency</td>
              <td class="border p-2">10%</td>
              <td class="border p-2">NABL Laboratory Batching Verification</td>
            </tr>
          </table>
        `;
        this.openModal('boq-printable-modal');
      },

      // Bidding Capacity Calculator
      recomputeBiddingCapacity() {
        const A = parseFloat(document.getElementById('calc-a')?.value || '85');
        const N = parseFloat(document.getElementById('calc-n')?.value || '2.0');
        const B = parseFloat(document.getElementById('calc-b')?.value || '70');
        const factor = parseFloat(document.getElementById('calc-factor')?.value || '1.5');

        const capacity = (factor * A * N) - B;
        const resEl = document.getElementById('calc-result-capacity');
        const verdictEl = document.getElementById('calc-result-verdict');
        if (!resEl || !verdictEl) return;

        resEl.textContent = `₹${capacity.toFixed(2)} Cr.`;

        if (capacity > 0) {
          verdictEl.className = "inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-laserEmerald-50 border border-laserEmerald-200 text-laserEmerald-700 font-mono font-bold text-xs";
          verdictEl.textContent = this.translate('calc-qual-yes');
        } else {
          verdictEl.className = "inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 font-mono font-bold text-xs";
          verdictEl.textContent = this.translate('calc-qual-no');
        }
      },

      // Machinery Fleet Methods
      filterFleet(cat) {
        this.state.activeFleetCategory = cat;
        document.querySelectorAll('.fleet-pill').forEach(btn => {
          if (btn.getAttribute('data-fleet') === cat) {
            btn.className = "fleet-pill px-3 py-1.5 rounded-lg bg-royalBlue-600 text-white transition-all shadow-sm shadow-royalBlue-600/30 whitespace-nowrap min-h-[38px] active:scale-95 shrink-0";
          } else {
            btn.className = "fleet-pill px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-all whitespace-nowrap min-h-[38px] active:scale-95 shrink-0";
          }
        });
        this.renderMachinery();
      },

      renderMachinery() {
        const track = document.getElementById('machinery-ticker-track');
        if (!track) return;
        track.innerHTML = '';
        const isHi = this.state.lang === 'hi';

        const filtered = MACHINERY_DATA.filter(m => {
          return this.state.activeFleetCategory === 'all' || m.category === this.state.activeFleetCategory;
        });

        // Ensure enough cards for a continuous infinite loop (at least 8 items base)
        let displayList = [...filtered];
        while (displayList.length < 8) {
          displayList = displayList.concat(filtered);
        }
        // Duplicate the list so at -50% to 0% it loops seamlessly left-to-right
        const loopList = displayList.concat(displayList);

        loopList.forEach(m => {
          const item = document.createElement('div');
          item.className = "bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 hover:border-royalBlue-400 hover:shadow-xl transition-all flex flex-col justify-between shrink-0 w-[285px] sm:w-[340px] md:w-[380px] group/card shadow-sm";

          const name = isHi ? m.name_hi : m.name;
          const catLabel = isHi ? m.categoryLabel_hi : m.categoryLabel;
          const assigned = isHi ? m.assignedDistrict_hi : m.assignedDistrict;
          const desc = isHi ? m.desc_hi : m.desc;

          item.innerHTML = `
            <div>
              <div class="flex justify-between items-center mb-3">
                <span class="w-10 h-10 rounded-xl bg-royalBlue-50 text-royalBlue-600 flex items-center justify-center border border-royalBlue-100 group-hover/card:scale-110 transition-transform">
                  <i data-lucide="${m.icon}" class="w-5 h-5"></i>
                </span>
                <span class="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-laserEmerald-700 bg-laserEmerald-50 px-2.5 py-0.5 rounded-full border border-laserEmerald-200">
                  <span class="w-1.5 h-1.5 rounded-full bg-laserEmerald-500 animate-pulse"></span>
                  ${isHi ? 'परिचालित' : 'Operational'}
                </span>
              </div>
              <div class="text-3xl font-black font-mono text-slate-900 mb-1 tracking-tight">
                ${m.count} <span class="text-xs text-slate-500 font-normal font-sans">${isHi ? 'इकाइयां' : 'Units'}</span>
              </div>
              <h4 class="font-bold text-slate-900 text-base leading-snug mb-1 group-hover/card:text-royalBlue-600 transition-colors">${name}</h4>
              <div class="text-xs font-mono text-royalBlue-600 mb-2">${catLabel} • ${m.capacity}</div>
              <p class="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">${desc}</p>
            </div>

            <div class="pt-3 border-t border-slate-100 text-[11px] font-mono text-slate-500 space-y-1.5">
              <div class="flex justify-between items-center">
                <span class="text-slate-400">Hub:</span>
                <span class="text-slate-700 font-sans font-medium">${assigned}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-slate-400">Engine Hours:</span>
                <span class="text-amberGold-600 font-bold">${m.engineHours}</span>
              </div>
              <div class="flex justify-between items-center text-[10px] text-slate-400">
                <span>Certification:</span>
                <span class="text-laserEmerald-600 font-medium">ISO/NABL Verified</span>
              </div>
            </div>
          `;
          track.appendChild(item);
        });
        if (window.lucide) lucide.createIcons();
      },

      toggleFleetAutoScroll() {
        const track = document.getElementById('machinery-ticker-track');
        const btnIcon = document.getElementById('fleet-pause-icon');
        const btnLabel = document.getElementById('fleet-pause-label');
        if (!track) return;
        
        const isPaused = track.classList.toggle('paused');
        if (btnIcon && btnLabel) {
          if (isPaused) {
            btnIcon.setAttribute('data-lucide', 'play');
            btnLabel.textContent = this.state.lang === 'hi' ? 'चालू करें' : 'Resume';
          } else {
            btnIcon.setAttribute('data-lucide', 'pause');
            btnLabel.textContent = this.state.lang === 'hi' ? 'रोकें' : 'Pause';
          }
          if (window.lucide) lucide.createIcons();
        }
        this.showToast(isPaused ? (this.state.lang === 'hi' ? 'कन्वेयर रोका गया' : 'Telemetry auto-scroll paused') : (this.state.lang === 'hi' ? 'कन्वेयर चालू किया गया' : 'Telemetry auto-scroll resumed'), 'info');
      },

      scrollFleetManual(direction) {
        const track = document.getElementById('machinery-ticker-track');
        if (!track) return;
        track.classList.add('paused');
        const btnIcon = document.getElementById('fleet-pause-icon');
        const btnLabel = document.getElementById('fleet-pause-label');
        if (btnIcon && btnLabel) {
          btnIcon.setAttribute('data-lucide', 'play');
          btnLabel.textContent = this.state.lang === 'hi' ? 'चालू करें' : 'Resume';
          if (window.lucide) lucide.createIcons();
        }
        
        const computed = window.getComputedStyle(track);
        const matrix = new DOMMatrixReadOnly(computed.transform);
        const currentX = matrix.m41;
        const cardWidth = 380 + 24;
        const newX = currentX + (direction * cardWidth);
        track.style.transition = 'transform 0.4s ease-out';
        track.style.transform = `translateX(${newX}px)`;
        setTimeout(() => {
          track.style.transition = '';
        }, 400);
      },

      setupFleetDrag() {
        const viewport = document.getElementById('telemetry-viewport');
        const track = document.getElementById('machinery-ticker-track');
        if (!viewport || !track) return;
        
        let isDown = false;
        let startX = 0;
        let scrollLeft = 0;

        viewport.addEventListener('mousedown', (e) => {
          isDown = true;
          viewport.classList.add('active');
          track.classList.add('paused');
          const btnIcon = document.getElementById('fleet-pause-icon');
          const btnLabel = document.getElementById('fleet-pause-label');
          if (btnIcon && btnLabel) {
            btnIcon.setAttribute('data-lucide', 'play');
            btnLabel.textContent = this.state.lang === 'hi' ? 'चालू करें' : 'Resume';
            if (window.lucide) lucide.createIcons();
          }
          startX = e.pageX;
          const computed = window.getComputedStyle(track);
          const matrix = new DOMMatrixReadOnly(computed.transform);
          scrollLeft = matrix.m41;
        });

        window.addEventListener('mouseup', () => {
          isDown = false;
          viewport.classList.remove('active');
        });

        viewport.addEventListener('mousemove', (e) => {
          if (!isDown) return;
          e.preventDefault();
          const x = e.pageX;
          const walk = (x - startX);
          track.style.transform = `translateX(${scrollLeft + walk}px)`;
        });
      },

      // Viewport Animated Metric Counters
      initCounterObserver() {
        const counters = document.querySelectorAll('.counter-target');
        if (!counters || counters.length === 0) return;
        const observer = new IntersectionObserver((entries, obs) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !this.state.countersAnimated) {
              this.state.countersAnimated = true;
              counters.forEach(c => this.animateCounter(c));
              obs.disconnect();
            }
          });
        }, { threshold: 0.25 });

        counters.forEach(c => observer.observe(c));
      },

      animateCounter(el) {
        const target = parseFloat(el.getAttribute('data-target') || '0');
        const prefix = el.getAttribute('data-prefix') || '';
        const isHi = this.state.lang === 'hi';
        const suffix = isHi ? (el.getAttribute('data-suffix-hi') || el.getAttribute('data-suffix') || '') : (el.getAttribute('data-suffix') || '');
        const duration = 1800;
        const startTime = performance.now();

        const update = (now) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease Out Cubic
          const ease = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(ease * target);
          el.textContent = `${prefix}${current}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            el.textContent = `${prefix}${target}${suffix}`;
          }
        };

        requestAnimationFrame(update);
      },

      // Toast Notification System
      showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = "pointer-events-auto p-4 rounded-2xl bg-white border border-slate-200 text-xs font-mono text-slate-900 shadow-2xl flex items-center justify-between gap-3 transform translate-y-2 opacity-0 transition-all duration-300";

        let icon = 'info';
        if (type === 'success') icon = 'check-circle-2';
        if (type === 'copy') icon = 'copy';

        toast.innerHTML = `
          <div class="flex items-center gap-2.5">
            <i data-lucide="${icon}" class="w-4 h-4 text-blueprint-400 shrink-0"></i>
            <span>${message}</span>
          </div>
          <button onclick="this.parentElement.remove()" class="text-slate-400 hover:text-white p-1">
            <i data-lucide="x" class="w-3.5 h-3.5"></i>
          </button>
        `;
        container.appendChild(toast);
        if (window.lucide) lucide.createIcons();

        // Animate In
        requestAnimationFrame(() => {
          toast.classList.remove('translate-y-2', 'opacity-0');
        });

        // Auto Dismiss after 4s
        setTimeout(() => {
          toast.classList.add('opacity-0', 'translate-x-4');
          setTimeout(() => toast.remove(), 300);
        }, 4000);
      },

      // Keyboard Shortcuts
      setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
          // Ctrl+K or Cmd+K
          if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            this.focusSearch();
          }
          // Escape key closes modals
          if (e.key === 'Escape') {
            document.querySelectorAll('.fixed.z-50:not(.hidden)').forEach(m => {
              if (m.id !== 'toast-container') m.classList.add('hidden');
            });
          }
        });
      },

      focusSearch() {
        const input = document.getElementById('proj-search-input');
        if (input) {
          const projEl = document.getElementById('projects');
          if (projEl) projEl.scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => input.focus(), 300);
          this.showToast('Search mode active. Type query...', 'info');
        }
      },

      // UI Modal Handlers
      openModal(id) {
        const modal = document.getElementById(id);
        if (modal) {
          modal.classList.remove('hidden');
          modal.classList.add('flex');
        }
        if (window.lucide) lucide.createIcons();
      },

      closeModal(id) {
        const modal = document.getElementById(id);
        if (modal) {
          modal.classList.add('hidden');
          modal.classList.remove('flex');
        }
      },

      toggleMobileMenu() {
        const d = document.getElementById('mobile-drawer');
        if (d) d.classList.toggle('hidden');
      },

      // Form Submissions
      applyJob(title, loc) {
        const titleEl = document.getElementById('job-modal-title');
        if (titleEl) titleEl.textContent = `Position: ${title} (${loc})`;
        this.openModal('job-modal');
      },

      handleJobSubmit(e) {
        e.preventDefault();
        const id = 'PAR-2026-ENG-' + Math.floor(1000 + Math.random() * 9000);
        this.closeModal('job-modal');
        this.showToast(`${this.translate('toast-applied')} ID: ${id}`, 'success');
        e.target.reset();
      },

      handleVendorSubmit(e) {
        e.preventDefault();
        const id = 'VEN-BR-' + Math.floor(1000 + Math.random() * 9000);
        this.showToast(`${this.translate('toast-vendor')} Ref: ${id}`, 'success');
        e.target.reset();
      },

      handleContactSubmit(e) {
        e.preventDefault();
        this.showToast('Message transmitted to Directorate. Our team will respond shortly.', 'success');
        e.target.reset();
      }
    };

    // DOM Ready Trigger
    document.addEventListener('DOMContentLoaded', () => {
      ParishishtApp.init();
    });
