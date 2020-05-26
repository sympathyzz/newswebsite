package com.newswebsite.control;

import java.io.File;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.annotation.SynthesizedAnnotation;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.github.pagehelper.PageInfo;
import com.newswebsite.bean.Atype;
import com.newswebsite.bean.News;
import com.newswebsite.bean.NewsType;
import com.newswebsite.bean.User;
import com.newswebsite.service.impl.NewsServiceImpl;
import com.newswebsite.service.impl.TypeServiceImpl;
import com.newswebsite.service.impl.UserServiceImpl;
import com.newswebsite.util.Utils;
import com.newswebsite.vo.Result;






@Controller
public class FrameController {
	@Resource
	NewsServiceImpl nsi;
	
	@Resource
	TypeServiceImpl tsi;
	
	@Resource
	UserServiceImpl usi;
	
	@Value("${coverPath}")
	private String coverPath;
	
	@Value("${bigPath}")
	private String bigPath;
	
	@Value("${smallPath}")
	private String smallPath;
	
	@Value("${actorPath}")
	private String actorPath;
	
	
	/**
	 * 打开后台页面
	 * @return
	 */
	@RequestMapping("manage")
	public String manage() {
		return "manage/login";
	}
	
	@RequestMapping("controllerLogin")
	public ModelAndView controllerLogin(ModelAndView model,@RequestParam(name="name") String name,@RequestParam(name="password") String password) {
		User login = usi.login(name,password);
		if(login == null) {
			model.addObject("msg","手机号暂未注册，请先行前往官网注册，并联系管理员开通管理权限");
			model.setViewName("manage/login");
		}else if(login.getStatus() == 0){
			model.addObject("msg","您的号码暂未开通管理权限，请联系管理开通");
			model.setViewName("manage/login");
		}else {
			model.setViewName("manage/frame");
		}
		return model;
	}
	
	@RequestMapping("changeStatus")
	@ResponseBody
	public Result changeStatus(User user) {
		int updata = usi.updata(user);
		Result re;
		if(updata > 0) {
			re = new Result(updata,"修改成功");
		}else {
			re = new Result(updata,"修改失败");
		}
		return re;
	}
	/**
	 * 获得全部电影信息
	 * @param model
	 * @param current
	 * @return
	 * @throws IllegalArgumentException
	 * @throws IllegalAccessException
	 */
	@RequestMapping("allNews")
	public ModelAndView getAllMovie(ModelAndView model,@RequestParam(defaultValue="1") int current) throws IllegalArgumentException, IllegalAccessException {
		model.setViewName("manage/allNews");
		
		PageInfo<News> l = nsi.findAllNews(current,null,null);
		
		List<Map<String,Object>> list = new ArrayList<>();
		for(News m:l.getList()) {
			Map<String,Object> m1 = new HashMap<>();
			String type = "";
			Utils.transformBeanToMap(m, m1);
			for(NewsType mt:m.getType()) {
				type+=tsi.findAtypeByTypeID(mt.getAtypeId()).getAtype()+"   ";
			}
			m1.put("type", type);
			list.add(m1);
		}
		List<Atype> typeList = tsi.findAllAtype();
		int total = nsi.findTotal(null,null);
		if(total % 5 == 0) {
			total /= 5;
		}else {
			total = (total / 5) + 1;
		}
		model.addObject("movieList",list);
		model.addObject("typeList",typeList);
		model.addObject("total",total);
		return model;
	}
	
	/**
	 添加电影
	 * @return
	 */
	@RequestMapping("addMovie")
	public String addMovie(Model model) {
		List<Atype> typeList = tsi.findAllAtype();
		model.addAttribute("typeList", typeList);
		return "manage/addMovie";
	}
	
	@RequestMapping("getAllUser")
 	public ModelAndView getAllUser(ModelAndView model) throws IllegalArgumentException, IllegalAccessException {
 		model.setViewName("manage/allUser");
 		PageInfo<User> allUser = usi.getAllUser(1, null);
 		List<User> userList = allUser.getList();
 		int total = (int) allUser.getTotal();
 		if(total % 5 == 0) {
 			total = total/5;
 		}else {
 			total = total/5+1;
 		}
 		model.addObject("userList",userList);
 		model.addObject("total",total);
 		return model;
 	}
	
	@RequestMapping("getAllUserByPage")
 	@ResponseBody
 	public List<Map<String,Object>> getAllUserByPage(ModelAndView model,@RequestParam(name="name")String name,@RequestParam(defaultValue="1") int current) throws IllegalArgumentException, IllegalAccessException {
 		PageInfo<User> allUser = usi.getAllUser(current, name);

 		List<Map<String,Object>> list = new ArrayList<>();
 		for(User u:allUser.getList()) {
 			Map<String,Object> map = new HashMap<>();
 			Utils.transformBeanToMap(u, map);
 			list.add(map);
 		}
 		int total = (int) allUser.getTotal();
 		if(total % 5 == 0) {
 			total = total/5;
 		}else {
 			total = total/5+1;
 		}
 		Map<String,Object> totalMap = new HashMap<>();
 		totalMap.put("total", total);
 		list.add(totalMap);
 		return list; 
 	}
	
	/**
	 添加新闻
	 * @return
	 */
	@RequestMapping("addNews")
	public String addNews(Model model) {
		List<Atype> typeList = tsi.findAllAtype();
		model.addAttribute("typeList", typeList);
		return "manage/addMovie";
	}
	
	@RequestMapping("toAddMovie")
	@ResponseBody
	public Result addMovie(News movie,@RequestParam(value = "typeList[]")String[] typeList) {
		
 		int r = nsi.add(movie);
		int movieId = nsi.getMovieId(movie);
		movie.setNewsId(movieId);

		Result re;
		if(r > 0) {
			re = new Result(movieId, "添加成功");
		}else {
			re = new Result(0, "添加失败");
		}
		return re;
	}
	
	
	/*
	*//**
	 * 分类查询
	 * @param model
	 * @param current
	 * @param sname
	 * @param sTime
	 * @return
	 * @throws IllegalArgumentException
	 * @throws IllegalAccessException
	 * @throws ParseException
	 *//*
	@RequestMapping("getAllMovieBypage")
	@ResponseBody
	public List<Map<String,Object>> getAllMovieBypage(ModelAndView model,@RequestParam(defaultValue="1") int current,@RequestParam(name="sname") String sname,@RequestParam(name="sTime") String sTime) throws IllegalArgumentException, IllegalAccessException, ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date date = null;
		if(sTime != null && sTime.trim().length() > 0) {
			date = sdf.parse(sTime);
		}
		int total = msi.findTotal(sname,date);
		if(total % 5 == 0) {
			total = total / 5;
		}else {
			total = (total / 5) + 1;
		}
		Map<String,Object> tmap = new HashMap();
		tmap.put("total", total);
		PageInfo<Movie> l = msi.findAllMoive(current,sname,date);
		List<Map<String,Object>> list = new ArrayList<>();
		for(Movie m:l.getList()) {
			Map<String,Object> m1 = new HashMap<>();
			String type = "";
			Utils.transformBeanToMap(m, m1);
			for(MovieType mt:m.getType()) {
				type+=tsi.findTypeByTypeID(mt.getTypeId()).getName()+"   ";
			}
			m1.put("type", type);
			list.add(m1);
		}
		list.add(tmap);
		return list;
	}
	
	*//**
	 添加电影
	 * @return
	 *//*
	@RequestMapping("addMovie")
	public String addMovie(Model model) {
		List<Type> typeList = tsi.findAllType();
		model.addAttribute("typeList", typeList);
		return "manage/addMovie";
	}
	
	*//**
	 * 获得电影详细信息
	 * @param model
	 * @param movieId
	 * @return
	 * @throws IllegalAccessException
	 * @throws InvocationTargetException
	 * @throws NoSuchMethodException
	 *//*
	@RequestMapping("getMovieDetail")
	@ResponseBody
	public Map<String,Object> getMovieDetail(Model model,int movieId) throws IllegalAccessException, InvocationTargetException, NoSuchMethodException{
		Map<String, Object> map = msi.findMovieDetailsByMovieId(movieId);
		List<Actor> actorList= (List<Actor>) map.get("actorList");
		if(actorList.size() > 0) {
			String actorlist = "";
			String direlist = "";
			for (Actor actor : actorList) {
				if(actor.getPosition().equals("演员")) {
					actorlist += actor.getAname()+"，";
				}else {
					direlist += actor.getAname()+"，";
				}
				
			}
			
			if(actorlist.contains("，")) {
				actorlist = actorlist.substring(0,actorlist.lastIndexOf("，"));
			}
			if(direlist.contains("，")) {
				direlist = direlist.substring(0,direlist.lastIndexOf("，"));
			}
			
			map.put("actorList", actorlist);
			map.put("direlist", direlist);
		}
		return map;
	}
	
	*//**
	 * 修改电影信息	
	 * @param movie
	 * @param typeList
	 * @param actor
	 * @return
	 *//*
	@RequestMapping("alterMovie")
	@ResponseBody
	public Result alterMovie(Movie movie,@RequestParam(value = "typeList[]")String[] typeList,@RequestParam(value = "actor")String actor,@RequestParam(value = "dire")String dire) {
		int r = msi.updateMovie(movie);
		mtsi.updateType(movie, typeList);
		masi.update(actor, movie);
		masi.update(1,dire,movie);
		Result re;
		if(r > 0) {
			re = new Result(1, "修改成功");
		}else {
			re = new Result(0, "修改失败");
		}
		return re;
	}
	
	*//**
	 * 上传电影封面
	 *//*
 	@PostMapping("ImgUpload")
    @ResponseBody
    public String upload(@RequestParam("file") MultipartFile file,@RequestParam(name="movieId") String MovieId) {
        if (file.isEmpty()) {
            return "上传失败，请选择文件";
        }
        MovieImage mi = new MovieImage();
        mi.setImage(file.getOriginalFilename());
        mi.setMovieId(Integer.parseInt(MovieId));
        mi.setType(MovieImageService.COVER_TYPE);
        String s = misi.getCover(mi.getMovieId());
        if(s == null) {
        	misi.add(mi);
        }else {
        	misi.update(mi);
        }
        String fileName = file.getOriginalFilename();
        String filePath = coverPath;
        File dest = new File(filePath + fileName);
        try {
            file.transferTo(dest);
            return "上传成功";
        } catch (IOException e) {
        }
        return "上传失败！";
    }
 	*//**
 	 * 添加大图
 	 * @param file
 	 * @param MovieId
 	 * @return
 	 *//*
 	@PostMapping("ImgUploadBig")
    @ResponseBody
    public String uploadBig(@RequestParam("file2") MultipartFile file,@RequestParam(name="movieId") String MovieId) {
        if (file.isEmpty()) {
            return "上传失败，请选择文件";
        }
        MovieImage mi = new MovieImage();
        mi.setImage(file.getOriginalFilename());
        mi.setMovieId(Integer.parseInt(MovieId));
        mi.setType(MovieImageService.BIG_IMG_TYPE);
        int s = misi.add(mi);
        String fileName = file.getOriginalFilename();
        String filePath = bigPath;
        File dest = new File(filePath + fileName);
        try {
            file.transferTo(dest);
            return "成功";
        } catch (IOException e) {
        }
        return "失败！";
    }
 	
 	*//**
 	 * 添加小图
 	 * @param file
 	 * @param MovieId
 	 * @return
 	 *//*
 	@PostMapping("ImgUploadSmall")
    @ResponseBody
    public String uploadSmall(@RequestParam("file3") MultipartFile file,@RequestParam(name="movieId") String MovieId) {
        if (file.isEmpty()) {
            return "上传失败，请选择文件";
        }
        MovieImage mi = new MovieImage();
        mi.setImage(file.getOriginalFilename());
        mi.setMovieId(Integer.parseInt(MovieId));
        mi.setType(MovieImageService.SMALL_IMG_TYPE);
        int r = misi.add(mi);
        String fileName = file.getOriginalFilename();
        String filePath = smallPath;
        File dest = new File(filePath + fileName);
        try {
            file.transferTo(dest);
            return "上传成功";
        } catch (IOException e) {
        }
        return "上传失败！";
    }
 	

 	@RequestMapping("toAddMovie")
	@ResponseBody
	public Result addMovie(Movie movie,@RequestParam(value = "typeList[]")String[] typeList,@RequestParam(value = "actor")String actor,@RequestParam(value = "dire")String dire) {
		
 		int r = msi.add(movie);
		int movieId = msi.getMovieId(movie);
		movie.setMovieId(movieId);
		mtsi.add(movie, typeList);
		masi.add(actor, movie);
		masi.add(1,dire,movie);
		Result re;
		if(r > 0) {
			re = new Result(movieId, "添加成功");
		}else {
			re = new Result(0, "添加失败");
		}
		return re;
	}
 	
 	@RequestMapping("deleteMovie")
 	@ResponseBody
 	public Result delete(@RequestParam(name="movieId") String MovieId,@RequestParam(name="number") String number) {
 		int id = Integer.parseInt(MovieId);
 		int result = msi.deleteMovie(id,number);
 		Result re;
		if(result > 0) {
			re = new Result(1, "操作成功");
		}else {
			re = new Result(0, "操作失败");
		}
		return re;
 	}
 	
 	*//**
 	 * 查询演员
 	 * @throws IllegalAccessException 
 	 * @throws IllegalArgumentException 
 	 *//*
 	@RequestMapping("getAllActorByPage")
 	@ResponseBody
 	public List<Map<String,Object>> getAllActorByPage(@RequestParam(name="flag",defaultValue="0")String flag,@RequestParam(name="name",defaultValue="")String name,ModelAndView model,@RequestParam(defaultValue="1") int current) throws IllegalArgumentException, IllegalAccessException {
 		Map<String, Object> map = asi.findActor(Integer.parseInt(flag),name, current);
 		List<Actor> list_1 = (List<Actor>) map.get("list");
 		long total = (long) map.get("total");
 		if(total % 5 == 0) {
			total /= 5;
		}else {
			total = (total / 5) + 1;
		}
 		List<Map<String,Object>> list = new ArrayList<>();
 		for(Actor a : list_1) {
 			Map<String,Object> map_1 = new HashMap<>();
 			Utils.transformBeanToMap(a, map_1);
 			list.add(map_1);
 		}
 		Map<String,Object> m = new HashMap<>();
 		m.put("total", total);
 		list.add(m);
 		return list;
 	}
 	
 	@RequestMapping("getAllActor")
 	public ModelAndView getAllActor(@RequestParam(name="flag",defaultValue="0")String flag,@RequestParam(name="name",defaultValue="")String name,ModelAndView model,@RequestParam(defaultValue="1") int current) {
 		Map<String, Object> map = asi.findActor(Integer.parseInt(flag),name, current);
 		List<Actor> list = (List<Actor>) map.get("list");
 		long total = (long) map.get("total");
 		if(total % 5 == 0) {
			total /= 5;
		}else {
			total = (total / 5) + 1;
		}
 		model.addObject("ActorList",list);
 		model.addObject("total",total);
 		model.setViewName("manage/allActor");
 		return model;
 	}
 	
 	@RequestMapping("getActorDetail")
 	@ResponseBody
 	public Actor getActorDetail(@RequestParam(name="aid")String id) {
 		return asi.findById(Integer.parseInt(id));
 	}
 	
 	@RequestMapping("alterActor")
 	@ResponseBody
 	public Result alertActor(Actor actor) {
 		int result = asi.update(actor);
 		Result re;
 		if(result >= 0) {
 			re = new Result(result, "修改成功!");
 		}else {
 			re = new Result(result, "修改失败!");
 		}
 		return re;
 	}
 	
 	
 	@PostMapping("ImgActorUpload")
    @ResponseBody
    public String Actorupload(@RequestParam("file") MultipartFile file) {
 		
        if (file.isEmpty()) {
            return "上传失败，请选择文件";
        }
        String fileName = file.getOriginalFilename();
        String filePath = actorPath;
        File dest = new File(filePath + fileName);
        try {
            file.transferTo(dest);
            return "成功";
        } catch (IOException e) {
        }
        return "失败！";
    }
 	
 	@RequestMapping("toAddActor")
 	public ModelAndView toAddActor(ModelAndView model) {
 		model.setViewName("manage/toAddActor");
 		return model;
 	}
 	
 	@RequestMapping("addActor")
 	@ResponseBody
 	public Result addActor(Actor actor) {
 		asi.add(actor);
 		Result re = new Result(1, "添加成功!");
 		return re;
 	}
 	
 	@RequestMapping("toAddCinema")
 	public String toAddCinema() {
 		return "manage/addCinema";
 	}
 	
 	@RequestMapping("addCinema")
 	@ResponseBody
 	public Result AddCinema(Model model,Cinema cinema) {
 		int addCineme = csi.addCinema(cinema);
 		if(addCineme > 0) {
 			Result result = new Result(addCineme, "添加成功!");
 			return result;
 		}else {
 			Result result = new Result(addCineme, "添加失败!");
 			return result;
 		}
 		
 	}
 	
 	@RequestMapping("updataCinema")
 	@ResponseBody
 	public Result updataCinema(Model model,Cinema cinema) {
 		int addCineme = csi.updataCinema(cinema);
 		if(addCineme > 0) {
 			Result result = new Result(addCineme, "修改成功!");
 			return result;
 		}else {
 			Result result = new Result(addCineme, "修改失败!");
 			return result;
 		}
 		
 	}
 	
 	@RequestMapping("allCinema")
 	public String allCinema(Model model,@RequestParam(name="name",required=false) String name) {
 		PageInfo<Cinema> page = csi.getAllCinema(1,name);
 		List<Cinema> allCinema = page.getList();
 		int total = (int) page.getTotal();
 		if(total % 5 == 0) {
			total /= 5;
		}else {
			total = (total / 5) + 1;
		}
 		model.addAttribute("allCinema", allCinema);
 		model.addAttribute("total", total);
 		return "manage/allCinema";
 	}
 	
 	@RequestMapping("cinemaDetails")
 	@ResponseBody
 	public Map<String,Object> cinemaDetail(@RequestParam(name="id")int id){
 		Cinema cinemaDetail = csi.getCinemaDetail(id);
 		String name = cinemaDetail.getName();
 		String address = cinemaDetail.getAddress();
 		
 		String[] split = address.split(",");
 		String province = split[0];
 		String city = split[1];
 		String path = split[2];
 		int cid = cinemaDetail.getCinemaId();
 		String gps = cinemaDetail.getGps();
 		String[] gps_s= null;
 		if(gps != null && gps.trim().length() > 0) {
 			gps_s  = gps.split(",");
 		}
 		
 		String gps_1 = "";
 		String gps_2 = "";
 		
 		
 		
 		if(gps_s != null) {
 			gps_1 = gps_s[0];
 			gps_2 = gps_s[1];
 		}
 		String img = cinemaDetail.getImg();
 		Map<String,Object> map = new HashMap<>();
 		map.put("name", name);
 		map.put("province",province);
 		map.put("city", city);
 		map.put("path", path);
 		map.put("id", cid);
 		map.put("img", img);
 		map.put("gps_1",gps_1);
 		map.put("gps_2",gps_2);
 		return map;
 	}
 	
 	@RequestMapping("getCinemaByName")
 	@ResponseBody
 	public List<Map<String,Object>> getCinemaByName(@RequestParam(name="name")String name,@RequestParam(defaultValue="1") int current,Model model) throws IllegalArgumentException, IllegalAccessException{
 		PageInfo<Cinema> page = csi.getCinemaByName(name,current);
 		List<Cinema> cinemaByName = page.getList();
 		List<Map<String,Object>> list = new ArrayList<>();
 		for(Cinema c:cinemaByName) {
 			Map<String,Object> map =  new HashMap<>();
 			Utils.transformBeanToMap(c, map);
 			list.add(map);
 		}
 		int total = (int) page.getTotal();
 		if(total % 5 == 0) {
			total /= 5;
		}else {
			total = (total / 5) + 1;
		}
 		Map<String,Object> m = new HashMap<>();
 		m.put("total", total);
 		list.add(m);
 		return list;
 	}
 	
 	@RequestMapping("addCinemaImg")
 	@ResponseBody
    public String CinemaImg(@RequestParam("file") MultipartFile file) {
  		
         if (file.isEmpty()) {
             return "上传失败，请选择文件";
         }
         String fileName = file.getOriginalFilename();
         String filePath = "D:\\upload\\cinemaImg\\";
         File dest = new File(filePath + fileName);
         try {
             file.transferTo(dest);
             return "成功";
         } catch (IOException e) {
         }
         return "失败！";
     }
 	
 	@RequestMapping("addHall")
 	@ResponseBody
 	public Result addHall(Hall hall) {
 		int addHall = csi.addHall(hall);
 		Result result;
 		if(addHall > 0) {
 			result = new Result(addHall,"添加成功");
 		}else {
 			result = new Result(addHall,"添加失败");
 		}
 		return result;
 	}
 	
 	@RequestMapping("getAllHallByCinemaId")
 	@ResponseBody
 	public List<Hall> getHallByCid(@RequestParam(name="cid") int cid){
 		List<Hall> result = csi.getHallByCinemaId(cid);
 		return result;
 	}
 	
 	@RequestMapping("getDetailByHallId")
 	@ResponseBody
 	public Hall getHallDetail(@RequestParam(name="hallId") int hallId) {
 		Hall hall = csi.getHallDetail(hallId);
 		return hall;
 	}
 	
 	@RequestMapping("updataHall")
 	@ResponseBody
 	public Result updataHal(Hall hall) {
 		int updata = csi.updataHall(hall);
 		Result result;
 		if(updata > 0) {
 			result = new Result(updata,"更新成功");
 		}else {
 			result = new Result(updata,"更新失败");
 		}
 		return result;
 	}
 	
 	@RequestMapping("hallAddMovie")
 	public String toHallAddMovie(Model model) {
 		List<Cinema> allCinema = csi.getAllCinema();
 		List<Movie> result = msi.findAllMovie();
 		model.addAttribute("CinemaList", allCinema);
 		model.addAttribute("MovieList",result);
 		return "manage/hallAddMovie";
 	}
 	
 	@RequestMapping("getMovieListByHall")
 	@ResponseBody
 	public List<Map<String,Object>> getMovieListByHall(@RequestParam(name="hallId")int hallId,@RequestParam(defaultValue="1") int current) throws IllegalArgumentException, IllegalAccessException{
 		PageInfo<Schedule> scheduleByHallId = ssi.getScheduleByHallId(hallId,current);
 		int total = (int) scheduleByHallId.getTotal();
 		if(total % 5 == 0) {
 			total = total/5;
 		}else {
 			total = total/5+1;
 		}
 		List<Map<String,Object>> list = new ArrayList<>();
 		for(Schedule s:scheduleByHallId.getList()) {
 			Map<String,Object> map = new HashMap<>();
 			Utils.transformBeanToMap(s, map);
 			Movie movie = msi.get(s.getMovieId());
 			long duration = movie.getDuration()*60*1000;
 			String name = movie.getName();
 			Timestamp startTime = s.getStartTime();
 			long start = startTime.getTime();
 			long end = start + duration;
 			Timestamp endTime = new Timestamp(end);
 			map.put("endTime",endTime);
 			map.put("name",name);
 			list.add(map);
 		}
 		Map<String,Object> m = new HashMap<>();
 		m.put("total",total);
 		list.add(m);
 		return list;
 	}
 	
 	@RequestMapping("addSchedule")
 	@ResponseBody
 	public Result addSchedule(Schedule schedule,@RequestParam(name="sTime") String sTime) throws IllegalArgumentException, IllegalAccessException {
 		Timestamp time = new Timestamp(Long.parseLong(sTime));
 		schedule.setStartTime(time);
 		int canBeAdd = ssi.canBeAdd(schedule);
 		if(canBeAdd == 1) {
 			Hall hall = csi.getHallDetail(schedule.getHallId());
 	 		schedule.setRemain(hall.getCapacity());
 	 		int result = ssi.addSchedule(schedule);
 	 		Result re;
 	 		if(result > 0) {
 	 			re = new Result(result,"添加成功");
 	 		}else {
 	 			re = new Result(result,"添加失败");
 	 		}
 	 		return re;
 		}else {
 			Result re = new Result(-1, "此时间段已存在电影排片信息");
 			return re;
 		}
 	}
 	
 	@RequestMapping("getScheduleById")
 	@ResponseBody
 	public Schedule getScheduleByid(@RequestParam(name="id")int id){
 		Schedule scheduleByid = ssi.getScheduleByid(id);
 		return scheduleByid;
 	}
 	
 	@RequestMapping("updataSchedule")
 	@ResponseBody
 	public Result updataSchedule(Schedule schedule) {
 		System.err.println(schedule.getScheduleId());
 		int updataSchedule = ssi.updataSchedule(schedule);
 		Result re;
 		if(updataSchedule > 0) {
 			re = new Result(updataSchedule, "更新成功");
 		}else {
 			re = new Result(updataSchedule, "更新失败");
 		}
 		return re;
 	}
 	
 	@RequestMapping("getAllUserByPage")
 	@ResponseBody
 	public List<Map<String,Object>> getAllUserByPage(ModelAndView model,@RequestParam(name="name")String name,@RequestParam(defaultValue="1") int current) throws IllegalArgumentException, IllegalAccessException {
 		PageInfo<User> allUser = usi.getAllUser(current, name);

 		List<Map<String,Object>> list = new ArrayList<>();
 		for(User u:allUser.getList()) {
 			Map<String,Object> map = new HashMap<>();
 			Utils.transformBeanToMap(u, map);
 			list.add(map);
 		}
 		int total = (int) allUser.getTotal();
 		if(total % 5 == 0) {
 			total = total/5;
 		}else {
 			total = total/5+1;
 		}
 		Map<String,Object> totalMap = new HashMap<>();
 		totalMap.put("total", total);
 		list.add(totalMap);
 		return list; 
 	}
 	
 	@RequestMapping("getAllUser")
 	public ModelAndView getAllUser(ModelAndView model) throws IllegalArgumentException, IllegalAccessException {
 		model.setViewName("manage/allUser");
 		PageInfo<User> allUser = usi.getAllUser(1, null);
 		List<User> userList = allUser.getList();
 		int total = (int) allUser.getTotal();
 		if(total % 5 == 0) {
 			total = total/5;
 		}else {
 			total = total/5+1;
 		}
 		model.addObject("userList",userList);
 		model.addObject("total",total);
 		return model;
 	}*/
}
